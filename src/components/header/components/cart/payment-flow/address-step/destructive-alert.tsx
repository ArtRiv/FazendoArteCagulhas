import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type AlertDestructiveProps = {
  message: string;
};

export function AlertDestructive({ message }: AlertDestructiveProps) {
  return (
    <Alert variant="destructive" className="border-destructive bg-white z-10">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        {message && (
          message
        )}
      </AlertDescription>
    </Alert>
  )
}
