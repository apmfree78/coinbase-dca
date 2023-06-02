import { toast, ToastType } from "bulma-toast";

// a wrapper around Chakra UI's useToast that has my default options applied
export function customToast(message: string | HTMLElement, type: ToastType) {
  return toast({
    message,
    type,
    animate: { in: "fadeIn" },
    position: "bottom-center",
  });
}
