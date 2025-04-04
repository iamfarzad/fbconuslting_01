"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Users, Briefcase, HeadphonesIcon, Package, RefreshCw, BarChart3, Shield } from "lucide-react"
import LiteratureCard from "./LiteratureCard" // Correct relative path
import { literatureData } from "../../data/literature-data" // Correct relative path
import { Button } from "@/components/ui/button"
// Import necessary Breadcrumb parts
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink // If needed for parent links
} from "@/components/ui/breadcrumb" 
import Link from "next/link"

export default function LiteraturePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredLiterature = literatureData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "all" || item.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Categories", icon: <BookOpen className="h-4 w-4" /> },
    { id: "hr", name: "Human Resources", icon: <Users className="h-4 w-4" /> },
    { id: "leadership", name: "Leadership", icon: <Briefcase className="h-4 w-4" /> },
    { id: "operations", name: "Operations", icon: <Package className="h-4 w-4" /> },
    { id: "customer-service", name: "Customer Service", icon: <HeadphonesIcon className="h-4 w-4" /> },
    { id: "product-management", name: "Product Management", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "organizational-change", name: "Organizational Change", icon: <RefreshCw className="h-4 w-4" /> },
    { id: "digital-transformation", name: "Digital Transformation", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "data-ethics", name: "Data Ethics", icon: <Shield className="h-4 w-4" /> },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Refactor Breadcrumb usage */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            {/* Assuming 'Literature' is the current page */}
            <BreadcrumbPage>Literature</BreadcrumbPage> 
            {/* If there was a parent like 'Resources', it would be: */}
            {/* <BreadcrumbLink href="/resources">Resources</BreadcrumbLink> */}
          </BreadcrumbItem>
          {/* Add Separator if there are multiple items */}
          {/* <BreadcrumbSeparator /> */}
          {/* <BreadcrumbItem>...</BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-3xl font-light mb-4">
          AI Business <span className="font-semibold">Literature</span>
        </h1>
        <p className="text-slate-600 mb-8">
          Explore our curated collection of academic and industry resources on AI implementation across different
          business domains.
        </p>

        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by title, author, or keyword..."
            className="pl-10 py-6 rounded-full border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          )}
        </div>
      </motion.div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <div className="overflow-x-auto pb-4 mb-8">
          <TabsList className="inline-flex w-auto p-1 bg-slate-100 rounded-full">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.id === "all" ? "/literature" : `/literature/${category.id}`}
                className="focus:outline-none"
              >
                <TabsTrigger
                  value={category.id}
                  className="rounded-full py-2 px-4 flex items-center gap-2 whitespace-nowrap"
                  onClick={(e) => {
                    if (category.id !== "all") {
                      e.preventDefault() // Prevent the tab from changing if we're navigating away
                    }
                  }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLiterature.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {/* Pass props individually, matching LiteratureCard prop names and data structure */}
                  <LiteratureCard 
                    id={String(item.id)} // Convert id to string
                    category={item.category}
                    title={item.title}
                    author={item.authors} // Pass 'authors' to 'author' prop
                    datePublished={item.year} // Pass 'year' to 'datePublished' prop
                    description={item.summary} // Pass 'summary' to 'description' prop
                    tags={item.keywords} // Pass 'keywords' to 'tags' prop
                    index={index} 
                  />
                </motion.div>
              ))}
            </div>

            {filteredLiterature.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">No results found. Try adjusting your search criteria.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
