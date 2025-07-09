import { useState, useEffect } from "react";
import { TestTube } from "lucide-react";
import type { Molecule } from "@shared/schema";

interface MoleculeViewerProps {
  molecule: Molecule | null;
  viewMode: string;
  isLoading: boolean;
}

declare global {
  interface Window {
    $3Dmol: any;
  }
}

export function MoleculeViewer({ molecule, viewMode, isLoading }: MoleculeViewerProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scientific-blue"></div>
            <span className="ml-3 text-gray-600">Loading molecule...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!molecule) {
    return (
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="text-center text-gray-500">
            <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No molecule selected</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Molecule Properties */}
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* SMILES */}
          <div>
            <h4 className="text-sm font-medium mb-2">Canonical SMILES</h4>
            <code className="bg-gray-100 px-3 py-2 rounded-md text-sm font-mono block">
              {molecule.smiles}
            </code>
          </div>

          {/* Both 2D and 3D Structure Visualization Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 2D Structure */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">2D Structure</h4>
              <div className="bg-gray-50 border rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                {molecule.structure2d ? (
                  <div dangerouslySetInnerHTML={{ __html: molecule.structure2d }} />
                ) : (
                  <div className="text-gray-500 text-center">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>2D structure not available</p>
                  </div>
                )}
              </div>
            </div>

            {/* 3D Structure */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">3D Structure</h4>
              <div className="bg-gray-50 border rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                {molecule.structure3d ? (
                  <div dangerouslySetInnerHTML={{ __html: molecule.structure3d }} />
                ) : (
                  <div className="text-gray-500 text-center">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>3D structure not available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Molecular Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Molecular Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Formula</p>
              <Badge variant="secondary" className="font-mono">{molecule.formula}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Molecular Weight</p>
              <Badge variant="secondary">{molecule.molecularWeight} g/mol</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">LogP</p>
              <Badge variant="secondary">{molecule.logP}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">H-bond Donors</p>
              <Badge variant="secondary">{molecule.hbd}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">H-bond Acceptors</p>
              <Badge variant="secondary">{molecule.hba}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
