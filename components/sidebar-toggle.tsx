"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "@/components/sidebar-provider"
import { motion } from "framer-motion"

export function SidebarToggle() {
  const { toggle } = useSidebar()

  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggle} aria-label="Toggle sidebar">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Menu className="h-5 w-5" />
      </motion.div>
    </Button>
  )
}
