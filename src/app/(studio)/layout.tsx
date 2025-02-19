
import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout"

interface LayoutStudioProps {
  children: React.ReactNode
}

const LayoutStudio = ({ children }: LayoutStudioProps) => {
  return (
    <StudioLayout>
      {children}
    </StudioLayout>
  )
}

export default LayoutStudio