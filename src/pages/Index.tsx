
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Flame, MapPin, Clock, Target } from "lucide-react";

interface TodayStats {
  steps: number;
  calories: number;
  distance: number;
  activeTime: number;
}

const Index = () => {
  const [todayStats, setTodayStats] = useState<TodayStats>({
    steps: 8432,
    calories: 387,
    distance: 6.2,
    activeTime: 45
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            今天也要保持活力！
          </h1>
          <p className="text-white/80 text-lg">
            记录每一次运动，见证自己的进步
          </p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                今日步数
              </CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {todayStats.steps.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">
                目标: 10,000步
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                消耗卡路里
              </CardTitle>
              <Flame className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {todayStats.calories}
              </div>
              <p className="text-xs text-gray-500">
                目标: 500卡
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                运动距离
              </CardTitle>
              <MapPin className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {todayStats.distance}km
              </div>
              <p className="text-xs text-gray-500">
                本周: 28.5km
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                活跃时间
              </CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {todayStats.activeTime}分钟
              </div>
              <p className="text-xs text-gray-500">
                目标: 60分钟
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">快速记录</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                记录你刚刚完成的运动
              </p>
              <Link to="/record">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                  开始记录
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">训练计划</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                制定和执行你的训练计划
              </p>
              <Link to="/training-plan">
                <Button variant="outline" className="w-full border-purple-500 text-purple-500 hover:bg-purple-50">
                  管理计划
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">查看历史</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                回顾你的运动历程
              </p>
              <Link to="/calendar">
                <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
                  查看日历
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">晨跑</p>
                    <p className="text-sm text-gray-500">今天 07:30</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">5.2km</p>
                  <p className="text-sm text-gray-500">28分钟</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">骑行</p>
                    <p className="text-sm text-gray-500">昨天 18:45</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">12.8km</p>
                  <p className="text-sm text-gray-500">45分钟</p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default Index;
