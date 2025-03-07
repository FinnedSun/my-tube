import { HomeLayout } from "@/modules/home/ui/layouts/home-layout"

export const dynamic = "force-dynamic";

interface LayoutHomeProps {
  children: React.ReactNode
}

const LayoutHome = ({ children }: LayoutHomeProps) => {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  )
}

export default LayoutHome