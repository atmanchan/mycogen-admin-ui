"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const DEFAULT_UNITS = ["pcs", "hrs", "day", "set", "month"]

interface QtyUnitProps {
  qty: number
  onQtyChange: (value: number) => void
  unit?: string
  onUnitChange: (value: string) => void
  name: string
  units?: string[]
}

export function QtyUnit({
  qty,
  onQtyChange,
  unit,
  onUnitChange,
  name,
  units = DEFAULT_UNITS,
}: QtyUnitProps) {
  return (
    <InputGroup className="h-8">
      <InputGroupInput
        type="number"
        value={qty}
        onChange={(e) => onQtyChange(Number(e.target.value))}
        aria-label={`${name} quantity`}
        className="[appearance:textfield] [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:[appearance:none] [&::-webkit-inner-spin-button]:[margin:0] [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:[appearance:none] [&::-webkit-outer-spin-button]:[margin:0]"
      />
      <InputGroupAddon align="inline-end" className="pr-0.5">
        <Select value={unit || undefined} onValueChange={(v) => onUnitChange(v ?? "")}>
          <SelectTrigger
            className="h-8 w-16 rounded-none border-0 bg-transparent px-1 pr-1 text-xs shadow-none justify-end dark:bg-transparent"
            aria-label={`${name} unit`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputGroupAddon>
    </InputGroup>
  )
}
