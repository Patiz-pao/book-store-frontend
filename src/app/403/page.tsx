"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <Ban className="mx-auto h-24 w-24 text-red-500 animate-pulse" />
          <h1 className="text-6xl font-bold text-gray-900">403</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Access Forbidden
          </h2>
          <p className="text-gray-600">
            ขออภัย คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-500">
              หรือ
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            กลับไปยังหน้าหลัก
          </Button>
        </div>
      </div>
    </div>
  );
}