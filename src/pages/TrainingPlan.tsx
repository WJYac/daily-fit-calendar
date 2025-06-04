
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Calendar, Plus, Target, CheckCircle, AlertCircle } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";

interface TrainingDay {
  date: Date;
  exercise: string;
  duration: number;
  description: string;
  completed: boolean;
}

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  days: TrainingDay[];
  isActive: boolean;
}

const TrainingPlan = () => {
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [activePlan, setActivePlan] = useState<TrainingPlan | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [todayReminder, setTodayReminder] = useState<TrainingDay | null>(null);

  // 训练计划模板
  const templates = [
    {
      name: "两周跑步计划",
      description: "适合初学者的两周跑步训练计划",
      duration: 14,
      exercises: [
        { day: 1, exercise: "跑步", duration: 20, description: "轻松慢跑 2公里" },
        { day: 2, exercise: "休息", duration: 0, description: "休息日，可以散步" },
        { day: 3, exercise: "跑步", duration: 25, description: "慢跑 3公里" },
        { day: 4, exercise: "力量训练", duration: 30, description: "核心肌群训练" },
        { day: 5, exercise: "跑步", duration: 30, description: "中等强度跑步 3.5公里" },
        { day: 6, exercise: "休息", duration: 0, description: "完全休息" },
        { day: 7, exercise: "跑步", duration: 35, description: "长距离慢跑 4公里" },
        { day: 8, exercise: "跑步", duration: 25, description: "恢复性慢跑 3公里" },
        { day: 9, exercise: "休息", duration: 0, description: "休息日" },
        { day: 10, exercise: "跑步", duration: 30, description: "间歇跑训练" },
        { day: 11, exercise: "力量训练", duration: 35, description: "全身力量训练" },
        { day: 12, exercise: "跑步", duration: 35, description: "稳定节奏跑 4公里" },
        { day: 13, exercise: "休息", duration: 0, description: "休息日" },
        { day: 14, exercise: "跑步", duration: 40, description: "挑战跑 5公里" }
      ]
    },
    {
      name: "一周力量训练",
      description: "全身力量训练计划",
      duration: 7,
      exercises: [
        { day: 1, exercise: "力量训练", duration: 45, description: "上肢力量训练" },
        { day: 2, exercise: "力量训练", duration: 45, description: "下肢力量训练" },
        { day: 3, exercise: "休息", duration: 0, description: "休息日" },
        { day: 4, exercise: "力量训练", duration: 40, description: "核心训练" },
        { day: 5, exercise: "力量训练", duration: 50, description: "全身综合训练" },
        { day: 6, exercise: "有氧运动", duration: 30, description: "轻松有氧运动" },
        { day: 7, exercise: "休息", duration: 0, description: "完全休息" }
      ]
    }
  ];

  const [newPlan, setNewPlan] = useState({
    name: "",
    template: "",
    startDate: format(new Date(), "yyyy-MM-dd")
  });

  useEffect(() => {
    // 检查今日提醒
    const today = new Date();
    if (activePlan) {
      const todayTraining = activePlan.days.find(day => 
        isSameDay(day.date, today) && !day.completed
      );
      setTodayReminder(todayTraining || null);
    }
  }, [activePlan]);

  const createPlanFromTemplate = () => {
    if (!newPlan.name || !newPlan.template) {
      toast({
        title: "请填写完整信息",
        description: "请输入计划名称并选择模板",
        variant: "destructive"
      });
      return;
    }

    const template = templates.find(t => t.name === newPlan.template);
    if (!template) return;

    const startDate = new Date(newPlan.startDate);
    const days: TrainingDay[] = template.exercises.map(exercise => ({
      date: addDays(startDate, exercise.day - 1),
      exercise: exercise.exercise,
      duration: exercise.duration,
      description: exercise.description,
      completed: false
    }));

    const plan: TrainingPlan = {
      id: Date.now().toString(),
      name: newPlan.name,
      description: template.description,
      startDate,
      endDate: addDays(startDate, template.duration - 1),
      days,
      isActive: true
    };

    // 停用其他计划
    const updatedPlans = plans.map(p => ({ ...p, isActive: false }));
    setPlans([...updatedPlans, plan]);
    setActivePlan(plan);
    setShowCreateForm(false);
    setNewPlan({ name: "", template: "", startDate: format(new Date(), "yyyy-MM-dd") });

    toast({
      title: "训练计划创建成功！",
      description: `${plan.name} 已开始执行`,
    });
  };

  const completeTraining = (dayIndex: number) => {
    if (!activePlan) return;

    const updatedPlan = { ...activePlan };
    updatedPlan.days[dayIndex].completed = true;

    setActivePlan(updatedPlan);
    setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));

    // 清除今日提醒
    if (todayReminder && isSameDay(todayReminder.date, updatedPlan.days[dayIndex].date)) {
      setTodayReminder(null);
    }

    toast({
      title: "训练完成！",
      description: "已标记为完成，继续保持！",
    });
  };

  const getTodayTrainingIndex = () => {
    if (!activePlan) return -1;
    const today = new Date();
    return activePlan.days.findIndex(day => isSameDay(day.date, today));
  };

  const todayTrainingIndex = getTodayTrainingIndex();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            训练计划
          </h1>
          <p className="text-white/80">
            制定和执行你的训练计划
          </p>
        </div>

        {/* 今日提醒 */}
        {todayReminder && (
          <Card className="bg-orange-100 border-orange-300 mb-6">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>今日训练提醒</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-orange-900">{todayReminder.exercise}</h3>
                  <p className="text-orange-700">{todayReminder.description}</p>
                  <p className="text-sm text-orange-600">
                    预计时长: {todayReminder.duration > 0 ? `${todayReminder.duration}分钟` : "休息日"}
                  </p>
                </div>
                {todayTrainingIndex >= 0 && todayReminder.exercise !== "休息" && (
                  <Button 
                    onClick={() => completeTraining(todayTrainingIndex)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    标记完成
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 创建新计划按钮 */}
        <div className="mb-6">
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            创建训练计划
          </Button>
        </div>

        {/* 创建计划表单 */}
        {showCreateForm && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-gray-900">创建新的训练计划</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="plan-name">计划名称</Label>
                  <Input
                    id="plan-name"
                    placeholder="输入计划名称"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">选择模板</Label>
                  <Select value={newPlan.template} onValueChange={(value) => setNewPlan({...newPlan, template: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择训练模板" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.name} value={template.name}>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-gray-500">{template.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">开始日期</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newPlan.startDate}
                    onChange={(e) => setNewPlan({...newPlan, startDate: e.target.value})}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button onClick={createPlanFromTemplate} className="flex-1">
                    创建计划
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 当前活跃计划 */}
        {activePlan && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center space-x-2">
                <Target className="h-5 w-5 text-orange-500" />
                <span>{activePlan.name}</span>
              </CardTitle>
              <p className="text-gray-600">{activePlan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activePlan.days.map((day, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      day.completed ? 'bg-green-50 border border-green-200' : 
                      isSameDay(day.date, new Date()) ? 'bg-orange-50 border border-orange-200' :
                      'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {day.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : isSameDay(day.date, new Date()) ? (
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                      ) : (
                        <Calendar className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {format(day.date, "MM月dd日")}
                          </span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {day.exercise}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{day.description}</p>
                        {day.duration > 0 && (
                          <p className="text-xs text-gray-500">时长: {day.duration}分钟</p>
                        )}
                      </div>
                    </div>
                    {!day.completed && isSameDay(day.date, new Date()) && day.exercise !== "休息" && (
                      <Button
                        size="sm"
                        onClick={() => completeTraining(index)}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        完成
                      </Button>
                    )}
                    {day.completed && (
                      <span className="text-green-600 text-sm font-medium">已完成</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 无活跃计划时的提示 */}
        {!activePlan && !showCreateForm && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">还没有训练计划</h3>
              <p className="text-gray-600 mb-4">创建你的第一个训练计划，开始系统化的健身之旅</p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              >
                立即创建
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainingPlan;
