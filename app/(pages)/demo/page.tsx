'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ButtonDemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Button 组件样式演示</h1>
        
        <div className="grid gap-6">
          {/* 按钮变体演示 */}
          <Card>
            <CardHeader>
              <CardTitle>按钮变体 (Variants)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </CardContent>
          </Card>

          {/* 按钮尺寸演示 */}
          <Card>
            <CardHeader>
              <CardTitle>按钮尺寸 (Sizes)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" variant="danger">Small</Button>
                <Button size="default" variant="danger">Default</Button>
                <Button size="lg" variant="danger">Large</Button>
                <Button size="icon" variant="danger">🗑️</Button>
              </div>
            </CardContent>
          </Card>

          {/* 危险操作场景演示 */}
          <Card>
            <CardHeader>
              <CardTitle>Danger 按钮使用场景</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 min-w-[120px]">删除操作:</span>
                  <Button variant="danger" size="sm">删除订单</Button>
                  <Button variant="danger" size="sm">删除账户</Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 min-w-[120px]">警告操作:</span>
                  <Button variant="danger">强制退出</Button>
                  <Button variant="danger">重置数据</Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 min-w-[120px]">取消操作:</span>
                  <Button variant="danger" size="lg">取消派对</Button>
                  <Button variant="danger" size="lg">终止订单</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 与其他变体对比 */}
          <Card>
            <CardHeader>
              <CardTitle>Danger vs Destructive 对比</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 min-w-[120px]">Destructive:</span>
                  <Button variant="destructive">系统级删除</Button>
                  <span className="text-xs text-gray-500">使用主题色系的红色</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 min-w-[120px]">Danger:</span>
                  <Button variant="danger">用户级警告</Button>
                  <span className="text-xs text-gray-500">使用纯红色系，更加醒目</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 状态演示 */}
          <Card>
            <CardHeader>
              <CardTitle>按钮状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 min-w-[120px]">正常状态:</span>
                  <Button variant="danger">点击删除</Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 min-w-[120px]">禁用状态:</span>
                  <Button variant="danger" disabled>删除不可用</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemoPage; 