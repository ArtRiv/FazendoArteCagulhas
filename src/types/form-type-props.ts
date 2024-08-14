import { formSchema } from "@/utils/zod";
import { z } from "zod";

export type FormProps = z.infer<typeof formSchema>