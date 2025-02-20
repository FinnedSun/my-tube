import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout"
import { Toaster } from "sonner"
interface LayoutStudioProps {
  children: React.ReactNode
}

const LayoutStudio = ({ children }: LayoutStudioProps) => {
  return (
    <StudioLayout>
      <Toaster />
      {children}
    </StudioLayout>
  )
}

export default LayoutStudio