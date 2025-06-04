
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Activity, Bike, Waves, Dumbbell } from "lucide-react";

interface ExerciseData {
  type: string;
  duration: string;
  distance: string;
  calories: string;
  notes: string;
}

const Record = () => {
  const [exerciseData, setExerciseData] = useState<ExerciseData>({
    type: "",
    duration: "",
    distance: "",
    calories: "",
    notes: ""
  });

  const exerciseTypes = [
    { value: "running", label: "跑步", icon: Activity },
    { value: "cycling", label: "骑行", icon: Bike },
    { value: "swimming", label: "游泳", icon: Waves },
    { value: "strength", label: "力量训练", icon: Dumbbell },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!exerciseData.type || !exerciseData.duration) {
      toast({
        title: "请填写必填项",
        description: "运动类型和持续时间是必填的",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving data
    toast({
      title: "记录成功！",
      description: `已记录你的${exerciseTypes.find(t => t.value === exerciseData.type)?.label}数据`,
    });

    // Reset form
    setExerciseData({
      type: "",
      duration: "",
      distance: "",
      calories: "",
      notes: ""
    });
  };

  const handleInputChange = (field: keyof ExerciseData, value: string) => {
    setExerciseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            记录运动数据
          </h1>
          <p className="text-white/80">
            记录你刚刚完成的运动
          </p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <span>运动详情</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="exercise-type">运动类型 *</Label>
                <Select 
                  value={exerciseData.type} 
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择运动类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">持续时间 (分钟) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                    value={exerciseData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distance">距离 (公里)</Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.1"
                    placeholder="5.0"
                    value={exerciseData.distance}
                    onChange={(e) => handleInputChange("distance", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calories">消耗卡路里</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="300"
                  value={exerciseData.calories}
                  onChange={(e) => handleInputChange("calories", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">备注</Label>
                <Input
                  id="notes"
                  placeholder="今天感觉很棒！"
                  value={exerciseData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  保存记录
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 border-gray-300"
                  onClick={() => setExerciseData({
                    type: "",
                    duration: "",
                    distance: "",
                    calories: "",
                    notes: ""
                  })}
                >
                  重置
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Record Buttons */}
        <div className="mt-8">
          <h3 className="text-white text-lg font-semibold mb-4">快速记录</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exerciseTypes.map((type) => (
              <Button
                key={type.value}
                variant="outline"
                className="h-20 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={() => handleInputChange("type", type.value)}
              >
                <div className="flex flex-col items-center space-y-2">
                  <type.icon className="h-6 w-6" />
                  <span className="text-sm">{type.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
