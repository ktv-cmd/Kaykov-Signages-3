import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <>
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
        position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
          actionButton:
              "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
              "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            success:
              "group-[.toast]:bg-red-50 group-[.toast]:border-red-200 group-[.toast]:text-red-900 sm:group-[.toast]:bg-background sm:group-[.toast]:border-border sm:group-[.toast]:text-foreground",
        },
      }}
      {...props}
    />
      <style>{`
        @media (max-width: 640px) {
          [data-sonner-toaster] {
            top: 1rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            right: auto !important;
            bottom: auto !important;
          }
          [data-sonner-toast][data-type="success"] {
            background-color: rgb(254 242 242) !important;
            border-color: rgb(254 226 226) !important;
            color: rgb(127 29 29) !important;
          }
          [data-sonner-toast][data-type="success"] [data-description] {
            color: rgb(153 27 27) !important;
          }
        }
        @media (min-width: 641px) {
          [data-sonner-toaster] {
            bottom: 1rem !important;
            right: 1rem !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  )
}

export { Toaster, toast }
