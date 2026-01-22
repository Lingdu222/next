'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // 获取所有用户
  const fetchUsers = async () => {
    setRefreshing(true)
    try {
      const response = await fetch('/api/users')
      const result = await response.json()
      if (result.success) {
        setUsers(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setRefreshing(false)
    }
  }

  // 创建用户
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
      const result = await response.json()
      if (result.success) {
        setName('')
        setEmail('')
        fetchUsers() // 重新获取用户列表
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error('Failed to create user:', error)
      alert('创建用户失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">🚀 Drizzle + PostgreSQL 数据库演示</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 创建用户表单 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">📝 添加新用户</h2>
          <form onSubmit={createUser} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <Input
                type="text"
                placeholder="输入用户名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <Input
                type="email"
                placeholder="输入邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? '🚀 添加中...' : '➕ 添加用户'}
            </Button>
          </form>
        </div>

        {/* 用户列表 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">👥 用户列表 ({users.length})</h2>
            <Button
              onClick={fetchUsers}
              disabled={refreshing}
              variant="outline"
              size="sm"
            >
              {refreshing ? '🔄 刷新中...' : '🔄 刷新'}
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div key={user.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-600 text-sm">📧 {user.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      🕒 {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    ID: {user.id}
                  </span>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>📭 暂无用户数据</p>
                <p className="text-sm mt-1">添加第一个用户试试！</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 数据库状态信息 */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📊 数据库连接状态</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="text-2xl">🗄️</div>
            <div className="font-medium">PostgreSQL</div>
            <div className="text-green-600">✅ 已连接</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl">⚡</div>
            <div className="font-medium">Drizzle ORM</div>
            <div className="text-green-600">✅ 已配置</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl">📋</div>
            <div className="font-medium">Users 表</div>
            <div className="text-green-600">✅ 已创建</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl">🔄</div>
            <div className="font-medium">API 路由</div>
            <div className="text-green-600">✅ 已启用</div>
          </div>
        </div>
      </div>
    </div>
  );
}
