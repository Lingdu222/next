import { db } from '@/app/server/db'
import { users } from '@/app/server/db/schema'
import { Button } from "@/components/ui/button"

export default async function ServerExamplePage() {
  // 在服务器端直接查询数据库
  const allUsers = await db.select().from(users)

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">🖥️ 服务器端组件数据库访问示例</h1>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400">ℹ️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>服务器端渲染：</strong> 这个页面在服务器上渲染，直接从数据库获取数据。
              数据在页面加载时就已经存在，无需客户端 JavaScript 请求。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">📊 数据库查询结果</h2>

        <div className="mb-4">
          <p className="text-gray-600">
            查询语句：<code className="bg-gray-100 px-2 py-1 rounded">SELECT * FROM users</code>
          </p>
          <p className="text-gray-600 mt-1">
            找到 <strong>{allUsers.length}</strong> 条记录
          </p>
        </div>

        {allUsers.length > 0 ? (
          <div className="grid gap-3">
            <div className="grid grid-cols-4 gap-3 font-semibold text-gray-700 border-b pb-2">
              <div>ID</div>
              <div>姓名</div>
              <div>邮箱</div>
              <div>创建时间</div>
            </div>
            {allUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-4 gap-3 py-2 border-b border-gray-100">
                <div className="font-mono text-sm">{user.id}</div>
                <div className="font-medium">{user.name}</div>
                <div className="text-blue-600">{user.email}</div>
                <div className="text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg">数据库中暂无用户数据</p>
            <p className="text-sm mt-2">请先在主页添加一些用户</p>
            <a href="/" className="inline-block mt-4">
              <Button>🏠 去主页添加用户</Button>
            </a>
          </div>
        )}
      </div>

      <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="font-semibold text-green-800 mb-2">💡 服务器端组件的优势：</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• 🚀 <strong>更快的首屏加载</strong> - 数据在服务器端获取</li>
          <li>• 🔍 <strong>更好的SEO</strong> - 搜索引擎能直接看到数据</li>
          <li>• 📱 <strong>减少客户端请求</strong> - 无需额外的API调用</li>
          <li>• 🛡️ <strong>安全性</strong> - 数据库查询在服务器端进行</li>
        </ul>
      </div>
    </div>
  );
}
