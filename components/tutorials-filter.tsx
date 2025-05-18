"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Filter } from "lucide-react"

export function TutorialsFilter() {
  const router = useRouter()

  // Get search params from URL in a client-safe way
  const [difficulty, setDifficulty] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Initialize from URL on client side
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search)

    // Only set these once on initial load
    if (difficulty === "" && searchParams.has("difficulty")) {
      setDifficulty(searchParams.get("difficulty") || "")
    }

    if (selectedTags.length === 0 && searchParams.has("tags")) {
      setSelectedTags(searchParams.get("tags")?.split(",").filter(Boolean) || [])
    }

    if (selectedTypes.length === 0 && searchParams.has("types")) {
      setSelectedTypes(searchParams.get("types")?.split(",").filter(Boolean) || [])
    }
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams()

    if (difficulty) {
      params.set("difficulty", difficulty)
    }

    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","))
    }

    if (selectedTypes.length > 0) {
      params.set("types", selectedTypes.join(","))
    }

    router.push(`/tutorials?${params.toString()}`)
  }

  const handleResetFilters = () => {
    setDifficulty("")
    setSelectedTags([])
    setSelectedTypes([])
    router.push("/tutorials")
  }

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Mock data for filters
  const tags = [
    "Next.js",
    "React",
    "App Router",
    "Pages Router",
    "API Routes",
    "Authentication",
    "Database",
    "Deployment",
    "Performance",
    "Testing",
  ]

  const types = ["Tutorial", "Reference", "Explanation", "Snippet", "Video"]

  return (
    <Card className="h-fit sticky top-20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleResetFilters}>
            <Filter className="h-4 w-4" />
            <span className="sr-only">Reset filters</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Difficulty</h3>
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced">Advanced</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Content Type</h3>
            <div className="space-y-2">
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => handleTypeChange(type)}
                  />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagChange(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
