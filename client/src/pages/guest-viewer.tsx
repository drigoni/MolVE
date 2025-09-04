import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TestTube, LogIn, Eye, RefreshCw } from "lucide-react";
import type { Molecule } from "@shared/schema";
import { ViewerCanvas } from "react-chemdoodle";

export default function GuestViewer() {
  const { toast } = useToast();
  const [currentMolecule, setCurrentMolecule] = useState<Molecule | null>(null);
  const molecule2DElementRef = useRef<HTMLDivElement | null>(null);
  const molecule3DElementRef = useRef<HTMLDivElement | null>(null);
  const moleculeInputRef = useRef<HTMLTextAreaElement | null>(null);

  // Check if guest viewing is allowed
  const { data: publicSettings, isLoading: settingsLoading } = useQuery<{
    allowGuestViewing: boolean;
  }>({
    queryKey: ["/api/public/settings"],
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  // Redirect if guest viewing is not allowed
  useEffect(() => {
    if (
      !settingsLoading &&
      publicSettings &&
      !publicSettings.allowGuestViewing
    ) {
      toast({
        title: "Access Restricted",
        description:
          "Guest viewing is currently disabled. Please log in to continue.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 2000);
      return;
    }
  }, [publicSettings, settingsLoading, toast]);

  const fetchRandomMolecule = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/public/molecules/random", {
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch molecule");
      }

      return response.json();
    },
    onSuccess: (molecule: Molecule) => {
      setCurrentMolecule(molecule);
      toast({
        title: "Success",
        description: "Loaded random molecule from database!",
      });
    },
    onError: (error: any) => {
      // Don't show toast for "no molecules available" - handle it in UI instead
      if (!error.message?.includes("No molecules available")) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch random molecule",
          variant: "destructive",
        });
      }
    },
  });

  const handleLoadRandom = () => {
    fetchRandomMolecule.mutate();
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
        j2sPath: "/JSmol/j2s",
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

  // Load initial random molecule
  useEffect(() => {
    if (
      !settingsLoading &&
      publicSettings?.allowGuestViewing &&
      !currentMolecule
    ) {
      fetchRandomMolecule.mutate();
    }
  }, [publicSettings, settingsLoading]);

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-lab-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scientific-blue"></div>
      </div>
    );
  }

  if (!publicSettings?.allowGuestViewing) {
    return (
      <div className="min-h-screen bg-lab-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-8">
            Guest viewing is currently disabled. Please log in to continue.
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <TestTube className="h-8 w-8 text-scientific-blue mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                AI-MolVE
              </h1>
              <span className="ml-3 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                Guest Mode
              </span>
            </div>
            <a
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login to Evaluate
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Molecular Structure Viewer
          </h1>
          <p className="text-gray-600">
            Explore molecular structures and their chemical properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Browse Molecules</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleLoadRandom}
                  disabled={fetchRandomMolecule.isPending}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${fetchRandomMolecule.isPending ? "animate-spin" : ""}`}
                  />
                  {fetchRandomMolecule.isPending
                    ? "Loading..."
                    : "Load Random Molecule"}
                </Button>
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
                    <code className={`bg-gray-100 px-3 py-2 rounded-md text-sm font-mono block ${fetchRandomMolecule.isPending ? 'opacity-50' : ''}`}>
                      {currentMolecule?.smiles || 'Loading...'}
                    </code>
                  </div>

                  {/* Properties */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Molecular Properties
                    </h4>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${fetchRandomMolecule.isPending ? 'opacity-50' : ''}`}>
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
                {fetchRandomMolecule.isPending && (
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

              {/* Molecular 3D Structure */}
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
                        className={`rounded-lg border border-gray-200 min-h-[400px] flex items-center justify-center block ${fetchRandomMolecule.isPending ? 'opacity-30' : ''}`}
                        style={{ width: "100%", height: "400px", border: "0px solid #ccc"}}
                      >
                        {!currentMolecule && !fetchRandomMolecule.isPending ? (
                          <div className="text-gray-500 text-center">
                            <TestTube className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              No Molecules Available
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                              The molecule database is currently empty. An administrator
                              needs to upload molecules before they can be viewed.
                            </p>
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
                {fetchRandomMolecule.isPending && (
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

              {/* Molecular 2D Structure */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Molecular 2D Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                    {/* 2D Structure */}
                    <div className="space-y-2 min-h-[400px] flex items-center justify-center"> 
                      {!currentMolecule && !fetchRandomMolecule.isPending ? (
                        <div className="text-gray-500 text-center">
                          <TestTube className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No Molecules Available
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            The molecule database is currently empty. An administrator
                            needs to upload molecules before they can be viewed.
                          </p>
                        </div>
                      ) : !currentMolecule ? (
                        <div className="text-gray-500 text-center">
                          <p>2D structure will render automatically</p>
                        </div>
                      ) : (
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
                      )}
                    </div>
                  </div>
                </CardContent>
                
                {/* Loading overlay for 2D structure */}
                {fetchRandomMolecule.isPending && (
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
              <Card className="hidden">
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
                            value={currentMolecule.sdf}
                            readOnly
                            className="w-full h-40 hidden"
                          ></textarea>
                        </pre>
                      </div>

                      {/* drigoni: Button removed*/}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      SDF data not available
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Guest Mode:</strong> You can view molecular
                    structures but cannot save evaluations.
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Login to access full evaluation features and save your work.
                  </p>
                </div>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-3"
                >
                  Login Now
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
