"use client";
import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useProducts } from "@/hooks/products/products.hook";

export default function Products() {

  const { setSearchParams, handleSearch, searchParams } = useProducts()

  return (
    <div className="container mx-auto py-4 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">หน้าแรก</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>สินค้า</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-4 py-4">
        <div>
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle>ตั้งค่าการค้นหา</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">ค้นหาตามชื่อหนังสือ</Label>
                    <Input 
                      id="name" 
                      placeholder="ชื่อหนังสือ" 
                      value={searchParams.bookName}
                      onChange={(e) => setSearchParams({
                        ...searchParams,
                        bookName: e.target.value
                      })}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">หมวดหมู่สินค้า</Label>
                    <Select 
                      onValueChange={(value) => setSearchParams({
                        ...searchParams,
                        category: value
                      })}
                    >
                      <SelectTrigger id="books">
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="kids">หนังสือเด็ก</SelectItem>
                        <SelectItem value="cartoons">การ์ตูนมังงะ</SelectItem>
                        <SelectItem value="education">การศึกษา</SelectItem>
                        <SelectItem value="technology">วิทยาการและเทคโนโลยี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label>ประเภทหนังสือ</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="physical"
                        checked={searchParams.types.physical}
                        onCheckedChange={(checked) => setSearchParams({
                          ...searchParams,
                          types: {
                            ...searchParams.types,
                            physical: checked === true
                          }
                        })}
                      />
                      <label
                        htmlFor="physical"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        หนังสือเล่ม
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ebook"
                        checked={searchParams.types.ebook}
                        onCheckedChange={(checked) => setSearchParams({
                          ...searchParams,
                          types: {
                            ...searchParams.types,
                            ebook: checked === true
                          }
                        })}
                      />
                      <label
                        htmlFor="ebook"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        E-book
                      </label>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full mt-4"
                  >
                    ค้นหา
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </div>

        <div>1234</div>
      </div>
    </div>
  );
}