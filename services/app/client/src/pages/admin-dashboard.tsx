import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { NavigationHeader } from "@/components/navigation-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { EvaluationCategoryChart } from "@/components/evaluation-category-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Download, Upload, Trash2, Plus, Edit, Users } from "lucide-react";
import type { DashboardStats as DashboardStatsType, Molecule, EvaluationWithMolecule } from "@shared/schema";

export default function AdminDashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sdfFile, setSdfFile] = useState<File | null>(null);
  const [evaluationMode, setEvaluationMode] = useState<'all' | 'unevaluated' | 'unevaluated_by_label'>('all');
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [editUser, setEditUser] = useState<any>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [allowGuestViewing, setAllowGuestViewing] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("overview");

  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      toast({
        title: "Access Denied",
        description: "Admin access required",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useQuery<DashboardStatsType>({
    queryKey: ["/api/dashboard/stats"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: settings } = useQuery<{ allowGuestViewing: boolean }>({
    queryKey: ["/api/admin/settings"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Update local state when settings are loaded
  useEffect(() => {
    if (settings) {
      setAllowGuestViewing(settings.allowGuestViewing);
    }
  }, [settings]);

  const [moleculesPage, setMoleculesPage] = useState(1);
  const [evaluationsPage, setEvaluationsPage] = useState(1);

  type PaginatedResponse<T> = {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };

  const { data: moleculesPageData, isLoading: moleculesLoading } = useQuery<PaginatedResponse<Molecule>>({
    queryKey: ["/api/admin/molecules", moleculesPage],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/admin/molecules?page=${moleculesPage}&limit=20`);
      return res.json();
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const molecules = moleculesPageData?.items ?? [];

  const [sdfLabel, setSdfLabel] = useState("");

  const { data: evaluationsPageData, isLoading: evaluationsLoading, refetch: refetchEvaluations } = useQuery<PaginatedResponse<EvaluationWithMolecule>>({
    queryKey: ["/api/admin/evaluations", evaluationsPage],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/admin/evaluations?page=${evaluationsPage}&limit=20`);
      return res.json();
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const evaluations = evaluationsPageData?.items ?? [];

  const { data: moleculeStats, isLoading: moleculeStatsLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/molecules/stats"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: users, isLoading: usersLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: evaluationModeData, isLoading: evaluationModeLoading } = useQuery<{ mode: 'all' | 'unevaluated' | 'unevaluated_by_label' }>({
    queryKey: ["/api/admin/evaluation-mode"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Update evaluation mode when data changes
  useEffect(() => {
    if (evaluationModeData) {
      setEvaluationMode(evaluationModeData.mode);
    }
  }, [evaluationModeData]);

  // Removed single molecule add - only SDF upload supported

  const deleteMolecule = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/molecules/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Molecule deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules/stats"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete molecule",
        variant: "destructive",
      });
    },
  });

  const deleteAllMolecules = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/admin/molecules", {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "All molecules deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules/stats"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete all molecules",
        variant: "destructive",
      });
    },
  });

  const handleDownloadDataset = () => {
    const link = document.createElement('a');
    link.href = '/api/admin/molecules/download';
    link.download = `molecules_dataset_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Dataset Download",
      description: "Molecules dataset download started",
    });
  };

  const handleDownloadEvaluations = () => {
    const link = document.createElement('a');
    link.href = '/api/admin/download/evaluations';
    link.download = `evaluations_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Evaluations Download",
      description: "Evaluations dataset download started",
    });
  };

  const setEvaluationModeMutation = useMutation({
    mutationFn: async (mode: 'all' | 'unevaluated' | 'unevaluated_by_label') => {
      const response = await apiRequest("POST", "/api/admin/evaluation-mode", { mode });
      return response.json();
    },
    onSuccess: (data) => {
      setEvaluationMode(data.mode);
      toast({
        title: "Success",
        description: `Evaluation mode set to: ${data.mode}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/evaluation-mode"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to set evaluation mode",
        variant: "destructive",
      });
    },
  });

  const deleteEvaluation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/evaluations/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Evaluation deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete evaluation",
        variant: "destructive",
      });
    },
  });

  const createUser = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/admin/users", userData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User created successfully!",
      });
      setNewUser({ username: '', password: '', role: 'user' });
      setIsUserDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({ id, ...userData }: any) => {
      const response = await apiRequest("PUT", `/api/admin/users/${id}`, userData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User updated successfully!",
      });
      setEditUser(null);
      setIsEditUserDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/users/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  const changePassword = useMutation({
    mutationFn: async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
      const response = await apiRequest("POST", "/api/auth/change-password", { currentPassword, newPassword });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Session expired. Please log in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (allowGuestViewing: boolean) => {
      const response = await apiRequest("POST", "/api/admin/settings", { allowGuestViewing });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Settings updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  const recomputeMlPredictions = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/recompute-ml-predictions", {});
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "ML Predictions Recomputed",
        description: data.message || "ML predictions recomputation started for all molecules.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to recompute ML predictions",
        variant: "destructive",
      });
    },
  });

  const uploadSdf = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('sdf', file);
      if (sdfLabel.trim()) {
        formData.append('label', sdfLabel.trim());
      }
      const response = await fetch("/api/admin/molecules/upload-sdf", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message || "SDF file uploaded successfully",
      });
      setSdfFile(null);
      setSdfLabel("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload SDF file",
        variant: "destructive",
      });
    },
  });

  const handleSdfUpload = () => {
    if (sdfFile) {
      uploadSdf.mutate(sdfFile);
    }
  };

  const handleDownloadMolecule = (molecule: Molecule) => {
    if (!molecule.sdf || !molecule.sdf.trim()) {
      toast({
        title: "No SDF data",
        description: "This molecule does not have SDF content stored.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([molecule.sdf], { type: "chemical/x-mdl-sdfile" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `molecule_${molecule.id}.sdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Molecule download",
      description: `SDF for molecule ${molecule.id} downloaded`,
    });
  };

  const handleDownloadSdfDataset = () => {
    if (!molecules || molecules.length === 0) {
      toast({
        title: "No molecules",
        description: "There are no molecules to download.",
      });
      return;
    }

    const sdfContent = molecules
      .map((mol) => mol.sdf || "")
      .filter((block) => block.trim().length > 0)
      .join("\n");

    if (!sdfContent.trim()) {
      toast({
        title: "No SDF data",
        description: "Molecules do not have SDF content stored.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([sdfContent], { type: "chemical/x-mdl-sdfile" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `molecules_${new Date().toISOString().split("T")[0]}.sdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "SDF download",
      description: "Molecules SDF dataset downloaded",
    });
  };

  const handleGuestViewingToggle = (checked: boolean) => {
    setAllowGuestViewing(checked);
    updateSettings.mutate(checked);
  };


  // Refetch relevant queries when tab changes or on initial mount
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') return;
    switch (currentTab) {
      case "overview":
        refetchStats();
        break;
      case "molecules":
        queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules"] });
        queryClient.invalidateQueries({ queryKey: ["/api/admin/molecules/stats"] });
        break;
      case "evaluations":
        refetchEvaluations();
        refetchStats();
        break;
      case "users":
        queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
        break;
      case "settings":
        queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
        break;
      default:
        break;
    }
  }, [currentTab, isAuthenticated, user, queryClient, refetchStats, refetchEvaluations]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    // Data will be refetched by useEffect above
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 4) {
      toast({
        title: "Error",
        description: "Password must be at least 4 characters long",
        variant: "destructive",
      });
      return;
    }

    changePassword.mutate({ currentPassword, newPassword });
  };



  // Create chart data for evaluation frequency distribution
  const chartData = moleculeStats ? 
    Array.from({ length: Math.max(...moleculeStats.map(m => m.evaluationCount || 0)) + 1 }, (_, i) => {
      const moleculesWithCount = moleculeStats.filter(m => (m.evaluationCount || 0) === i).length;
      return {
        evaluationCount: i,
        moleculeCount: moleculesWithCount
      };
    }).filter(item => item.moleculeCount > 0) : [];

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-lab-bg">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Manage molecules, view statistics, and configure system settings
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="molecules">Molecules</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardStats stats={stats} isLoading={statsLoading} />
          </TabsContent>

          <TabsContent value="molecules">
            <div className="space-y-6">
              {/* SDF Upload section */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Molecules</CardTitle>
                  <CardDescription>
                    Upload pre-optimized molecular structures via SDF files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sdf-label" className="text-sm font-medium">
                        Label (optional)
                      </Label>
                      <p className="text-xs text-gray-500 mb-2">
                        This label will be associated with all molecules imported from this SDF file.
                      </p>
                      <Input
                        id="sdf-label"
                        type="text"
                        value={sdfLabel}
                        onChange={(e) => setSdfLabel(e.target.value)}
                        placeholder="e.g. Model V.1"
                        disabled={uploadSdf.isPending}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sdf-input" className="text-sm font-medium">
                        SDF File Upload
                      </Label>
                      <p className="text-xs text-gray-500 mb-2">
                        Upload SDF file containing pre-optimized molecular structures. Can contain multiple molecules.
                      </p>
                      <Input
                        id="sdf-input"
                        type="file"
                        accept=".sdf,.mol"
                        onChange={(e) => setSdfFile(e.target.files?.[0] || null)}
                        disabled={uploadSdf.isPending}
                      />
                      <Button 
                        onClick={() => sdfFile && uploadSdf.mutate(sdfFile)}
                        disabled={uploadSdf.isPending || !sdfFile}
                        className="w-full mt-2 bg-scientific-blue hover:bg-scientific-blue/90"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadSdf.isPending ? "Processing..." : "Upload SDF"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Molecules list */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Molecules Database</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleDownloadDataset}
                        variant="outline"
                        size="sm"
                        className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download CSV
                      </Button>
                      <Button
                        onClick={handleDownloadSdfDataset}
                        variant="outline"
                        size="sm"
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download SDF
                      </Button>
                      <Button 
                        onClick={() => deleteAllMolecules.mutate()}
                        disabled={deleteAllMolecules.isPending}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {moleculesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scientific-blue"></div>
                    </div>
                  ) : molecules && molecules.length > 0 ? (
                    <>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              SMILES
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Label
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              MW (g/mol)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              LogP
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              HBD
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              HBA
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              SAS
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              NPS
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              NPS Confidence
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ML Prediction
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {molecules.map((molecule) => (
                            <tr key={molecule.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                {molecule.smiles}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.label ?? "—"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.molecularWeight}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.logP}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.hbd ?? "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.hba ?? "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.sas ?? "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.nps}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.npsConfidence}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {molecule.mlPrediction === 0 && "Do Not Prioritize"}
                                {molecule.mlPrediction === 1 && "Borderline"}
                                {molecule.mlPrediction === 2 && "Prioritize"}
                                {molecule.mlPrediction == null && "Pending"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {molecule.createdAt ? new Date(molecule.createdAt).toLocaleDateString() : "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleDownloadMolecule(molecule)}
                                    variant="outline"
                                    size="sm"
                                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                                  >
                                    <Download className="h-4 w-4 mr-1" />
                                  </Button>
                                  <Button
                                    onClick={() => deleteMolecule.mutate(molecule.id)}
                                    disabled={deleteMolecule.isPending}
                                    variant="destructive"
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-600">
                        Page {moleculesPageData?.page ?? 1} of {moleculesPageData?.totalPages ?? 1} (Total: {moleculesPageData?.total ?? 0})
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setMoleculesPage((p) => Math.max(1, p - 1))}
                          disabled={(moleculesPageData?.page ?? 1) <= 1 || moleculesLoading}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!moleculesPageData) return;
                            setMoleculesPage((p) => Math.min(moleculesPageData.totalPages, p + 1));
                          }}
                          disabled={
                            moleculesLoading ||
                            !moleculesPageData ||
                            (moleculesPageData?.page ?? 1) >= (moleculesPageData?.totalPages ?? 1)
                          }
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No molecules in database</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="evaluations">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>All User Evaluations</CardTitle>
                  <Button onClick={handleDownloadEvaluations} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {evaluationsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scientific-blue"></div>
                  </div>
                ) : evaluations && evaluations.length > 0 ? (
                  <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SMILES
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Label
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ML Prediction
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Evaluation
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Issues
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Notes
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {evaluations.map((evaluation: any) => (
                          <tr key={evaluation.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evaluation.user?.username || 'Unknown'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                              {evaluation.molecule.smiles}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evaluation.molecule.label ?? '—'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evaluation.molecule?.mlPrediction === 0 && "Do Not Prioritize"}
                              {evaluation.molecule?.mlPrediction === 1 && "Borderline"}
                              {evaluation.molecule?.mlPrediction === 2 && "Prioritize"}
                              {evaluation.molecule?.mlPrediction == null && "Pending"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                evaluation.evaluation === 'prioritize'
                                  ? 'bg-green-100 text-green-800'
                                  : evaluation.evaluation === 'do_not_prioritize'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {evaluation.evaluation}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {(() => {
                                const issues: string[] = [];
                                if (evaluation.issueSolubility) issues.push("Solubility");
                                if (evaluation.issueSyntheticAccessibility) issues.push("Synthetic Accessibility");
                                if (evaluation.issueDimension) issues.push("Dimension");
                                if (evaluation.issuePermeability) issues.push("Permeability");

                                return issues.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {issues.map((issue) => (
                                      <span
                                        key={issue}
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700"
                                      >
                                        {issue}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-xs">—</span>
                                );
                              })()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                              {evaluation.notes || '—'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(evaluation.createdAt!).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteEvaluation.mutate(evaluation.id)}
                                disabled={deleteEvaluation.isPending}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      Page {evaluationsPageData?.page ?? 1} of {evaluationsPageData?.totalPages ?? 1} (Total: {evaluationsPageData?.total ?? 0})
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEvaluationsPage((p) => Math.max(1, p - 1))}
                        disabled={(evaluationsPageData?.page ?? 1) <= 1 || evaluationsLoading}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!evaluationsPageData) return;
                          setEvaluationsPage((p) => Math.min(evaluationsPageData.totalPages, p + 1));
                        }}
                        disabled={
                          evaluationsLoading ||
                          !evaluationsPageData ||
                          (evaluationsPageData?.page ?? 1) >= (evaluationsPageData?.totalPages ?? 1)
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500 py-8">No evaluations yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-scientific-blue hover:bg-scientific-blue/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New User</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="new-username">Username</Label>
                          <Input
                            id="new-username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="new-password">Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="new-role">Role</Label>
                          <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={() => createUser.mutate(newUser)}
                          disabled={createUser.isPending}
                          className="w-full"
                        >
                          {createUser.isPending ? "Creating..." : "Create User"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scientific-blue"></div>
                  </div>
                ) : users && users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Login
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user: any) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => {
                                    setEditUser(user);
                                    setIsEditUserDialogOpen(true);
                                  }}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  onClick={() => deleteUser.mutate(user.id)}
                                  disabled={deleteUser.isPending}
                                  variant="destructive"
                                  size="sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No users found</p>
                )}
              </CardContent>
            </Card>

            {/* Edit User Dialog */}
            <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                {editUser && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-username">Username</Label>
                      <Input
                        id="edit-username"
                        value={editUser.username}
                        onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-password">New Password (optional)</Label>
                      <Input
                        id="edit-password"
                        type="password"
                        value={editUser.password || ''}
                        onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-role">Role</Label>
                      <Select value={editUser.role} onValueChange={(value) => setEditUser({ ...editUser, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={() => updateUser.mutate(editUser)}
                      disabled={updateUser.isPending}
                      className="w-full"
                    >
                      {updateUser.isPending ? "Updating..." : "Update User"}
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>
                    Configure how users can interact with the application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Allow Guest Viewing</Label>
                        <div className="text-sm text-muted-foreground">
                          Allow users to view molecular structures without logging in
                        </div>
                      </div>
                      <Switch
                        checked={allowGuestViewing}
                        onCheckedChange={handleGuestViewingToggle}
                        disabled={updateSettings.isPending}
                      />
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="space-y-0.5">
                        <Label className="text-base">Recompute ML Predictions</Label>
                        <div className="text-sm text-muted-foreground">
                          Force recalculation of ML predictions for all molecules using the Python service.
                        </div>
                      </div>
                      <Button
                        onClick={() => recomputeMlPredictions.mutate()}
                        disabled={recomputeMlPredictions.isPending}
                        className="bg-scientific-blue hover:bg-scientific-blue/90"
                      >
                        {recomputeMlPredictions.isPending ? "Recomputing..." : "Recompute"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

                            {/* Evaluation Mode Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label>Select evaluation mode for users:</Label>
                    <RadioGroup 
                      value={evaluationMode} 
                      onValueChange={(value: 'all' | 'unevaluated' | 'unevaluated_by_label') => setEvaluationMode(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all-mode" />
                        <Label htmlFor="all-mode" className="cursor-pointer">
                          All molecules (including evaluated)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unevaluated" id="unevaluated-mode" />
                        <Label htmlFor="unevaluated-mode" className="cursor-pointer">
                          Only unevaluated molecules
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unevaluated_by_label" id="unevaluated-by-label-mode" />
                        <Label htmlFor="unevaluated-by-label-mode" className="cursor-pointer">
                          Unevaluated, prioritizing molecules with more labels
                        </Label>
                      </div>
                    </RadioGroup>
                    <Button 
                      onClick={() => setEvaluationModeMutation.mutate(evaluationMode)}
                      disabled={setEvaluationModeMutation.isPending}
                      className="bg-scientific-blue hover:bg-scientific-blue/90"
                    >
                      {setEvaluationModeMutation.isPending ? "Updating..." : "Update Mode"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Admin Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        disabled={changePassword.isPending}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={changePassword.isPending}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={changePassword.isPending}
                      />
                    </div>
                    <Button 
                      onClick={handleChangePassword}
                      disabled={changePassword.isPending}
                      className="bg-scientific-blue hover:bg-scientific-blue/90"
                    >
                      {changePassword.isPending ? "Changing..." : "Change Password"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}