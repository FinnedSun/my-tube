"use client"

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const audienceData = [
  { date: "Feb 11", returning: 120000, newViewers: 30000 },
  { date: "Feb 15", returning: 115000, newViewers: 25000 },
  { date: "Feb 18", returning: 130000, newViewers: 27000 },
  { date: "Feb 22", returning: 110000, newViewers: 26000 },
  { date: "Feb 26", returning: 140000, newViewers: 28000 },
  { date: "Mar 1", returning: 125000, newViewers: 31000 },
  { date: "Mar 5", returning: 135000, newViewers: 29000 },
  { date: "Mar 10", returning: 150000, newViewers: 35000 },
];

export default function AudienceAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Channel Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="audience">
            <TabsList className="flex gap-4 border-b pb-2 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reach">Reach</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
            </TabsList>

            <TabsContent value="audience">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <Card className="text-center py-6 bg-blue-50">
                  <CardTitle className="text-lg">Returning Viewers</CardTitle>
                  <p className="text-3xl font-bold text-blue-600">775.5K</p>
                </Card>

                <Card className="text-center py-6 bg-green-50">
                  <CardTitle className="text-lg">Unique Viewers</CardTitle>
                  <p className="text-3xl font-bold text-green-600">1.2M</p>
                </Card>

                <Card className="text-center py-6 bg-red-50">
                  <CardTitle className="text-lg">Subscribers</CardTitle>
                  <p className="text-3xl font-bold text-red-600">+3.3K</p>
                  <p className="text-sm text-red-400">↓ 51%</p>
                </Card>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={audienceData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="returning" stroke="#8B5CF6" strokeWidth={2} name="Returning viewers" />
                  <Line type="monotone" dataKey="newViewers" stroke="#3B82F6" strokeWidth={2} name="New viewers" />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <p>Period: Feb 11 – Mar 10, 2021 (Last 28 days)</p>
                <a href="#" className="text-blue-500 hover:underline">Advanced Mode</a>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}