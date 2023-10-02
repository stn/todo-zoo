import React from "react"

import { Button } from "@/components/ui/button"

interface FilterButtonProps {
  name: string
  isPressed: boolean
  setFilter: (name: string) => void
}

function FilterButton({ name, isPressed, setFilter }: FilterButtonProps) {
  const variant = isPressed ? "outline" : "secondary"
  return (
    <Button
      variant={variant}
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="hidden">Show </span>
      <span>{name}</span>
      <span className="hidden"> tasks</span>
    </Button>
  )
}

export default FilterButton
