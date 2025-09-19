"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { User, Mail, Plus, Calendar, Users } from "lucide-react"

interface Lead {
  name: string
  email: string
  status: "New" | "Engaged" | "Proposal Sent" | "Closed-Won" | "Closed-Lost"
  date: string
}

const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Engaged: "bg-yellow-100 text-yellow-800",
  "Proposal Sent": "bg-purple-100 text-purple-800",
  "Closed-Won": "bg-green-100 text-green-800",
  "Closed-Lost": "bg-red-100 text-red-800",
}

export default function LeadManagementApp() {
  const server = "http://localhost:4000/leads";
  // const server = "http://localhost:4000/leads"; // Use this for local development
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "" as Lead["status"] | "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  })


  // Fetch leads on component mount
  const fetchLeads = useCallback( async () => {
    try {
      setLoading(true)
      const response = await axios.get(server)
      if (response.data.success) {
        setLeads(response.data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [server])

   useEffect(() => {
    fetchLeads()
  }, [ fetchLeads ])

  const validateForm = () => {
    const newErrors = { name: "", email: "" }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !formData.status) return

    try {
      setSubmitting(true)
      const response = await axios.post(server, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        status: formData.status,
      })

      if (response.data.success) {
        setLeads((prev) => [response.data.data, ...prev])
        setFormData({ name: "", email: "", status: "" })
        setErrors({ name: "", email: "" })
      }
    } catch (error: unknown) {
      console.log(error)

    if (axios.isAxiosError(error)) {
      const apiMessage =
        (error.response?.data as { message?: string } | undefined)?.message;
      alert(apiMessage ?? error.message ?? "An error occurred while adding the lead.");
    } else if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An error occurred while adding the lead.");
    }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Management App</h1>
          <p className="text-gray-600">Track and manage your sales leads efficiently</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Lead Form */}
          <div className="lg:col-span-1 self-start bg-white rounded-lg border border-gray-300 shadow-md">
            <div className="p-6 border-b border-gray-300">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Lead
              </h2>
              <p className="text-sm text-gray-600 mt-1">Enter lead information to add them to your pipeline</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter lead name"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as Lead["status"] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select status</option>
                    <option value="New">New</option>
                    <option value="Engaged">Engaged</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed-Won">Closed-Won</option>
                    <option value="Closed-Lost">Closed-Lost</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting || !formData.name || !formData.email || !formData.status}
                >
                  {submitting ? "Adding Lead..." : "Add Lead"}
                </button>
              </form>
            </div>
          </div>

          {/* Leads List */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-300 shadow-md">
            <div className="p-6 border-b border-gray-300">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Leads ({leads.length})
              </h2>
              <p className="text-sm text-gray-600 mt-1">Manage and track your sales pipeline</p>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-gray-600">Loading leads...</div>
                </div>
              ) : leads.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No leads yet. Add your first lead to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead, index) => (
                    <div
                      key={`${lead.email}-${index}`}
                      className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{lead.name}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(lead.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
