import React, { useEffect, useRef, useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { NavigationHeader } from "@/components/navigation-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { RefreshCw, Eye, ThumbsUp, ThumbsDown, Meh, Star } from "lucide-react";
import type { Molecule } from "@shared/schema";
import { ViewerCanvas } from "react-chemdoodle";

export default function UserEvaluation() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState("");
  const molecule2DElementRef = useRef<HTMLDivElement | null>(null);
  const molecule3DElementRef = useRef<HTMLDivElement | null>(null);
  const moleculeInputRef = useRef<HTMLTextAreaElement | null>(null);


  // Redirect to login if not authenticated or not a user
  useEffect(() => {
    if (
      !isLoading &&
      (!isAuthenticated || (user?.role !== "user" && user?.role !== "admin"))
    ) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const [currentMolecule, setCurrentMolecule] = useState<Molecule | null>(null);

  const {
    data: initialMolecule,
    isLoading: initialLoading,
  } = useQuery<Molecule>({
    queryKey: ["/api/molecules/random"],
    enabled:
      isAuthenticated && (user?.role === "user" || user?.role === "admin"),
    queryFn: async () => {
      const response = await fetch("/api/molecules/random");
      if (!response.ok) throw new Error("Failed to fetch molecule");
      return response.json();
    },
  });

  const fetchNewMolecule = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/molecules/random");
      if (!response.ok) throw new Error("Failed to fetch molecule");
      return response.json();
    },
    onSuccess: (molecule: Molecule) => {
      setCurrentMolecule(molecule);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch molecule",
        variant: "destructive",
      });
    },
  });

  // Set initial molecule when loaded
  useEffect(() => {
    if (initialMolecule && !currentMolecule) {
      setCurrentMolecule(initialMolecule);
    }
  }, [initialMolecule, currentMolecule]);

  const moleculeLoading = initialLoading || fetchNewMolecule.isPending;

  const submitEvaluation = useMutation({
    mutationFn: async ({
      evaluation,
      notes,
    }: {
      evaluation: string;
      notes?: string;
    }) => {
      if (!currentMolecule) throw new Error("No molecule to evaluate");

      const response = await apiRequest("POST", "/api/evaluations", {
        moleculeId: currentMolecule.id,
        evaluation,
        notes,
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Evaluation submitted successfully!",
      });

      // Clear notes, selected evaluation and fetch a new molecule
      setNotes("");
      setSelectedEvaluation("");
      fetchNewMolecule.mutate();
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }

      toast({
        title: "Error",
        description: error.message || "Failed to submit evaluation",
        variant: "destructive",
      });
    },
  });

  const handleEvaluationSubmit = () => {
    if (!selectedEvaluation) {
      toast({
        title: "Error",
        description: "Please select an evaluation",
        variant: "destructive",
      });
      return;
    }
    submitEvaluation.mutate({
      evaluation: selectedEvaluation,
      notes: notes.trim() || undefined,
    });
  };

  const handleRenderSDF = async () => {
    // 2D rendering with JSmol
    if (molecule3DElementRef.current && moleculeInputRef.current) {
      const element3D = molecule3DElementRef.current;
      const sdfData = moleculeInputRef.current.value;
      const sdfCore = "\n" + sdfData;
      
      element3D.innerHTML = ""; // Clear previous

      if (sdfData.trim() === "") {
        toast({
          title: "Error",
          description: "No SDF data available",
          variant: "destructive",
        });
        return;
      }

      const Info = {
        width: element3D.offsetWidth,
        height: element3D.offsetHeight,
        debug: false,
        color: "white",
        use: "HTML5",
        j2sPath: "http://localhost:5000/JSmol/j2s",
        script: `
          set frank OFF;
          set antialiasDisplay ON;
          set platformSpeed 3;
          load DATA 'sdf'\n${sdfCore}\nEND 'sdf';
          zoom 80; // Zoom to fit the molecule in the view
          spin on; // Enable continuous rotation
          spin y 5; // Spin around the y-axis at a speed of 1
          spin x 5; // Spin around the y-axis at a speed of 1
        `,
        disableInitialConsole: true,
        console: "none",
        allowJavaScript: true,
        info: "",
        addSelectionOptions: false,
        disableJ2SLoadMonitor: true,
        loadMonitorTitle: "",
        loadMonitorMessage: "",
        showInfo: false,
        // pixelRatio: 100, // or 3 for even higher DPI
        // useHardwareScaling: true, // optional, lets JSmol auto-detect
      };

      const applet = Jmol.getApplet("jmolApplet3D", Info);
      element3D.innerHTML = Jmol.getAppletHtml(applet);
      Jmol.script(applet, "set antialiasDisplay ON");

      // need to remove this, as not needed but added automatically by JSmol
      const placeholder = element3D.querySelector('img[width="0"][height="0"]');
      if (placeholder) {
        placeholder.remove();
      }
    }
  };

  // Add this useEffect right after the handleRenderSDF function:
  useEffect(() => {
    if (currentMolecule && currentMolecule.sdf) {
      handleRenderSDF();
    }
  }, [currentMolecule]);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (user?.role !== "user" && user?.role !== "admin") {
    return <div>Access denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Molecular Structure Evaluation
          </h1>
          <p className="text-gray-600">
            Evaluate molecular structures for drug-likeness and chemical
            properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - View Options and Evaluation Controls */}
          <div className="space-y-6">
            {/* View Options */}
            <Card>
              <CardHeader>
                <CardTitle>View Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={() => fetchNewMolecule.mutate()}
                    disabled={moleculeLoading}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${moleculeLoading ? "animate-spin" : ""}`}
                    />
                    {moleculeLoading ? "Loading..." : "Load New Molecule"}
                  </Button>

                  

                  {/* Evaluation Controls */}
                  <div className="space-y-4 pt-4 border-t">
                    

                    <div className="space-y-3">
                      <Label>Select evaluation type:</Label>
                      <RadioGroup
                        value={selectedEvaluation}
                        onValueChange={setSelectedEvaluation}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="awesome"
                            id="awesome"
                            disabled={
                              submitEvaluation.isPending || !currentMolecule
                            }
                          />
                          <Label
                            htmlFor="awesome"
                            className="flex items-center cursor-pointer"
                          >
                            <Star className="h-4 w-4 mr-2 text-purple-600" />
                            Awesome
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="positive"
                            id="positive"
                            disabled={
                              submitEvaluation.isPending || !currentMolecule
                            }
                          />
                          <Label
                            htmlFor="positive"
                            className="flex items-center cursor-pointer"
                          >
                            <ThumbsUp className="h-4 w-4 mr-2 text-green-600" />
                            Good
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="borderline"
                            id="borderline"
                            disabled={
                              submitEvaluation.isPending || !currentMolecule
                            }
                          />
                          <Label
                            htmlFor="borderline"
                            className="flex items-center cursor-pointer"
                          >
                            <Meh className="h-4 w-4 mr-2 text-yellow-600" />
                            Borderline
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="negative"
                            id="negative"
                            disabled={
                              submitEvaluation.isPending || !currentMolecule
                            }
                          />
                          <Label
                            htmlFor="negative"
                            className="flex items-center cursor-pointer"
                          >
                            <ThumbsDown className="h-4 w-4 mr-2 text-red-600" />
                            Bad
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="futuristic"
                            id="futuristic"
                            disabled={
                              submitEvaluation.isPending || !currentMolecule
                            }
                          />
                          <Label
                            htmlFor="futuristic"
                            className="flex items-center cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-2 text-cyan-600" />
                            Futuristic
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any comments about this molecule..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <Button
                      onClick={handleEvaluationSubmit}
                      disabled={
                        submitEvaluation.isPending ||
                        !currentMolecule ||
                        !selectedEvaluation
                      }
                      className="w-full bg-scientific-blue hover:bg-scientific-blue/90 text-white"
                    >
                      {submitEvaluation.isPending
                        ? "Submitting..."
                        : "Submit Evaluation"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Molecule Information */}
          <div className="lg:col-span-2 relative">
            {/* Always show the structure, but overlay loading state */}
            <div className="space-y-6">
              {/* SMILES and Properties */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Molecular Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* SMILES */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Canonical SMILES
                    </h4>
                    <code className={`bg-gray-100 px-3 py-2 rounded-md text-sm font-mono block ${moleculeLoading ? 'opacity-50' : ''}`}>
                      {currentMolecule?.smiles || 'Loading...'}
                    </code>
                  </div>

                  {/* Properties */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Molecular Properties
                    </h4>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${moleculeLoading ? 'opacity-50' : ''}`}>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Molecular Weight
                        </p>
                        <Badge variant="secondary">
                          {currentMolecule?.molecularWeight ?? '--'} g/mol
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">LogP</p>
                        <Badge variant="secondary">
                          {currentMolecule?.logP ?? '--'}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">H-bond Donors</p>
                        <Badge variant="secondary">
                          {currentMolecule?.hbd ?? '--'}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          H-bond Acceptors
                        </p>
                        <Badge variant="secondary">
                          {currentMolecule?.hba ?? '--'}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Synthetic Accessibility Score
                        </p>
                        <Badge variant="secondary">
                          {currentMolecule?.sas ?? '--'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Loading overlay for molecular information */}
                {moleculeLoading && (
                  <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-scientific-blue"></div>
                      <span className="ml-3 text-gray-600 text-sm">
                        Loading molecule data...
                      </span>
                    </div>
                  </div>
                )}
              </Card>

              {/* Molecular Structure */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Molecular 3D Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                    {/* 3D Structure */}
                    <div className="space-y-2">
                      <div
                        id="molecule-3Dviewer-container"
                        ref={molecule3DElementRef}
                        className={`rounded-lg border border-gray-200 min-h-[400px] flex items-center justify-center block ${moleculeLoading ? 'opacity-30' : ''}`}
                        style={{ width: "100%", height: "400px", border: "0px solid #ccc"}}
                      >
                        {!currentMolecule && !moleculeLoading ? (
                          <div className="text-center text-gray-500">
                            <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No molecule selected</p>
                          </div>
                        ) : !currentMolecule ? (
                          <div className="text-gray-500 text-center">
                            <p>3D structure will render automatically</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Loading overlay for 3D structure */}
                {moleculeLoading && (
                  <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-scientific-blue"></div>
                      <span className="ml-3 text-gray-600 text-sm">
                        Loading 3D structure...
                      </span>
                    </div>
                  </div>
                )}
              </Card>

              {/* Molecular Structure */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Molecular 2D Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="space-y-2 min-h-[400px] flex items-center justify-center"> {/* Center content */}
                      {currentMolecule?.sdf ? (
                        <ViewerCanvas
                          key={`${currentMolecule?.id}-${Date.now()}`}
                          id="molecule-2d-viewer"
                          data={{ mol: "\n" + currentMolecule.sdf }}
                          width={400}
                          height={400}
                          canvasStyle={{
                            atoms_useJMOLColors: true,
                            bonds_width_2D: 1,
                            bonds_saturationWidthAbs_2D: 20,
                            bonds_hashSpacing_2D: 1,
                            atoms_font_size_2D: 32,
                            atoms_font_families_2D: ['Helvetica', 'Arial', 'sans-serif'],
                            atoms_displayTerminalCarbonLabels_2D: true,
                          }}
                          moleculeStyle={{
                            scaleToAverageBondLength: 50,
                          }}
                        />
                      ) : (
                        <div className="text-center text-gray-500">
                          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No molecule selected</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                {moleculeLoading && (
                  <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-scientific-blue"></div>
                      <span className="ml-3 text-gray-600 text-sm">
                        Loading 2D structure...
                      </span>
                    </div>
                  </div>
                )}
              </Card>


              {/* SDF Data Display */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-lg">SDF Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentMolecule?.sdf ? (
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap overflow-auto max-h-60">
                          <textarea
                            ref={moleculeInputRef}
                            value={currentMolecule?.sdf}
                            readOnly
                            className="w-full h-40"
                          ></textarea>
                        </pre>
                      </div>
                      {/* drigoni: just for debugging purposes*/}
                      {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRenderSDF}
                      >
                        Render SDF
                      </Button> */}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const blob = new Blob([currentMolecule?.sdf!], {
                            type: "text/plain",
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `molecule_${currentMolecule?.id}.sdf`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                      >
                        Download SDF
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      SDF data not available
                    </p>
                  )}
                </CardContent>

                {/* Loading overlay for SDF data */}
                {moleculeLoading && (
                  <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-scientific-blue"></div>
                      <span className="ml-3 text-gray-600 text-sm">
                        Loading SDF data...
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
