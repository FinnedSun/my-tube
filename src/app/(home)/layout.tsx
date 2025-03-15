import { HomeLayout } from "@/modules/home/ui/layouts/home-layout"


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