import { useToast } from "@chakra-ui/react";

export default function ErrorToast() {
  const toast = useToast();
  const id = "error-toast";
  return (
    <>
      {toast.isActive(id)
        ? ""
        : toast({
            id,
            title: "Error",
            description: "An error occurred retrieving the videos.",
            status: "error",
            isClosable: true,
          })}
    </>
  );
}
