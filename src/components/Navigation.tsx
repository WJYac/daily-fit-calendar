
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, BarChart3, Calendar as CalendarIcon, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "首页" },
    { path: "/record", icon: PlusCircle, label: "记录" },
    { path: "/training-plan", icon: Target, label: "训练计划" },
    { path: "/statistics", icon: BarChart3, label: "统计" },
    { path: "/calendar", icon: CalendarIcon, label: "日历" },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">FitTracker</h1>
          </div>
          <div className="flex space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
                  location.pathname === path
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon size={20} />
                <span className="hidden sm:block">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
