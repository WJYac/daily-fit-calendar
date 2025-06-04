
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Activity, Flame, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface ExerciseRecord {
  date: string;
  exercises: {
    type: string;
    duration: number;
    distance?: number;
    calories: number;
    icon: React.ComponentType<any>;
    color: string;
  }[];
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Sample exercise data
  const exerciseData: ExerciseRecord[] = [
    {
      date: "2024-06-04",
      exercises: [
        {
          type: "晨跑",
          duration: 30,
          distance: 5.2,
          calories: 320,
          icon: Activity,
          color: "bg-orange-100 text-orange-600"
        }
      ]
    },
    {
      date: "2024-06-03",
      exercises: [
        {
          type: "骑行",
          duration: 45,
          distance: 12.8,
          calories: 480,
          icon: Activity,
          color: "bg-blue-100 text-blue-600"
        },
        {
          type: "力量训练",
          duration: 25,
          calories: 180,
          icon: Activity,
          color: "bg-purple-100 text-purple-600"
        }
      ]
    },
    {
      date: "2024-06-02",
      exercises: [
        {
          type: "游泳",
          duration: 40,
          distance: 2.0,
          calories: 350,
          icon: Activity,
          color: "bg-cyan-100 text-cyan-600"
        }
      ]
    },
    {
      date: "2024-06-01",
      exercises: [
        {
          type: "跑步",
          duration: 35,
          distance: 6.1,
          calories: 420,
          icon: Activity,
          color: "bg-orange-100 text-orange-600"
        }
      ]
    }
  ];

  const getSelectedDateData = () => {
    if (!selectedDate) return null;
    const dateString = format(selectedDate, "yyyy-MM-dd");
    return exerciseData.find(data => data.date === dateString);
  };

  const hasExerciseOnDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return exerciseData.some(data => data.date === dateString);
  };

  const selectedDateData = getSelectedDateData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            运动日历
          </h1>
          <p className="text-white/80">
            回顾你的运动历程
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-orange-500" />
                  <span>选择日期</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={zhCN}
                  className="rounded-md border-0"
                  modifiers={{
                    hasExercise: (date) => hasExerciseOnDate(date)
                  }}
                  modifiersStyles={{
                    hasExercise: {
                      backgroundColor: 'rgba(249, 115, 22, 0.2)',
                      color: 'rgb(249, 115, 22)',
                      fontWeight: 'bold'
                    }
                  }}
                />
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">
                    <strong>提示：</strong> 橙色日期表示有运动记录
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Details */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  {selectedDate ? format(selectedDate, "MM月dd日", { locale: zhCN }) : "选择日期"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateData ? (
                  <div className="space-y-4">
                    {selectedDateData.exercises.map((exercise, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={exercise.color}>
                            {exercise.type}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{exercise.duration}分钟</span>
                          </div>
                          
                          {exercise.distance && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{exercise.distance}km</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <Flame className="h-4 w-4 text-gray-500" />
                            <span>{exercise.calories}卡</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Daily Summary */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">今日总结</h4>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">总时长:</span>
                          <span className="font-medium">
                            {selectedDateData.exercises.reduce((sum, ex) => sum + ex.duration, 0)}分钟
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">总距离:</span>
                          <span className="font-medium">
                            {selectedDateData.exercises.reduce((sum, ex) => sum + (ex.distance || 0), 0)}km
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">总卡路里:</span>
                          <span className="font-medium">
                            {selectedDateData.exercises.reduce((sum, ex) => sum + ex.calories, 0)}卡
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {selectedDate ? "这天没有运动记录" : "请选择一个日期"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">本月统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">训练天数</span>
                    <Badge variant="secondary">12天</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">总时长</span>
                    <Badge variant="secondary">8.5小时</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">总距离</span>
                    <Badge variant="secondary">85.6km</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">总卡路里</span>
                    <Badge variant="secondary">4,520卡</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
