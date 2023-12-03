"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/form/image";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BITBUCKET,
  CODEPEN,
  GITHUB,
  GITLAB,
  LINKEDIN,
  TWITTER,
} from "@/constants/socials";
import { Information, Social } from "@/interfaces/information";
import {
  INFORMATION_COLLECTION_ID,
  PORTFOLIO_BUCKET_ID,
  database_service,
  storage_service,
} from "@/lib/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .max(128, { message: "Title must be less than 128 characters" }),
  description: z
    .string()
    .max(512, { message: "Description must be less than 512 characters" }),
  image: z.any(),
  github: z
    .string()
    .max(128, { message: "Username must be less than 128 characters" }),
  gitlab: z
    .string()
    .max(128, { message: "Username must be less than 128 characters" }),
  bitbucket: z
    .string()
    .max(128, { message: "Username must be less than 128 characters" }),
  codepen: z
    .string()
    .max(128, { message: "Username must be less than 128 characters" }),
  twitter: z
    .string()
    .max(128, { message: "Username must be less than 128 characters" }),
  linkedin: z
    .string()
    .max(128, { message: "Username must be less than 128 characters" }),
});

interface InformationFormProps {
  data: Information;
}

export const InformationForm = ({ data }: InformationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      image: data?.icon ?? "",
      github:
        (
          data?.social.find(
            (x) => typeof x !== "string" && x.url.includes("github"),
          ) as Social
        )?.value ?? "",
      gitlab:
        (
          data?.social.find(
            (x) => typeof x !== "string" && x.url.includes("gitlab"),
          ) as Social
        )?.value ?? "",
      bitbucket:
        (
          data?.social.find(
            (x) => typeof x !== "string" && x.url.includes("bitbucket"),
          ) as Social
        )?.value ?? "",
      codepen:
        (
          data?.social.find(
            (x) => typeof x !== "string" && x.url.includes("codepen"),
          ) as Social
        )?.value ?? "",
      twitter:
        (
          data?.social.find(
            (x) => typeof x !== "string" && x.url.includes("twitter"),
          ) as Social
        )?.value ?? "",
      linkedin:
        (
          data?.social.find(
            (x) => typeof x !== "string" && x.url.includes("linkedin"),
          ) as Social
        )?.value ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let image = null;
    if (values.image && typeof values.image !== "string") {
      image = await storage_service.upload(
        PORTFOLIO_BUCKET_ID,
        values.image[0],
      );
    }

    const information = {
      title: values.title,
      description: values.description,
      icon: image?.$id ?? values.image,
      social: [
        `{"url":"${BITBUCKET}","value":"${values.bitbucket}"}`,
        `{"url":"${CODEPEN}","value":"${values.codepen}"}`,
        `{"url":"${GITHUB}","value":"${values.github}"}`,
        `{"url":"${GITLAB}","value":"${values.gitlab}"}`,
        `{"url":"${LINKEDIN}","value":"${values.linkedin}"}`,
        `{"url":"${TWITTER}","value":"${values.twitter}"}`,
      ],
    };

    if (data?.$id) {
      await database_service.update<Information>(
        INFORMATION_COLLECTION_ID,
        information,
        data.$id,
      );
    } else {
      await database_service.create<Information>(
        INFORMATION_COLLECTION_ID,
        information,
      );
    }
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Kenneth Bass' Portfolio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="This is my portfolio, full of amazing projects!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImageInput form={form} />
            <Separator />
            <p className="font-semibold leading-none tracking-tight">Socials</p>
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center">
                      <p className="grid h-9 place-items-center rounded-l-md border border-slate-700 bg-slate-900 px-2 text-sm font-bold text-white">
                        https://github.com/
                      </p>
                      <Input
                        className="rounded-l-none"
                        placeholder="dishwasher-detergent"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Your GitHub username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bitbucket"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BitBucket</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center">
                      <p className="grid h-9 place-items-center rounded-l-md border border-slate-700 bg-slate-900 px-2 text-sm font-bold text-white">
                        https://bitbucket.org/
                      </p>
                      <Input
                        className="rounded-l-none"
                        placeholder="dishwasher-detergent"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Your BitBucket username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gitlab"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitLab</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center">
                      <p className="grid h-9 place-items-center rounded-l-md border border-slate-700 bg-slate-900 px-2 text-sm font-bold text-white">
                        https://gitlab.com/
                      </p>
                      <Input
                        className="rounded-l-none"
                        placeholder="diswasher-detergent"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Your GitLab username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codepen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CodePen</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center">
                      <p className="grid h-9 place-items-center rounded-l-md border border-slate-700 bg-slate-900 px-2 text-sm font-bold text-white">
                        https://codepen.com/
                      </p>
                      <Input
                        className="rounded-l-none"
                        placeholder="kennethbass"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Your CodePen username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center">
                      <p className="grid h-9 place-items-center rounded-l-md border border-slate-700 bg-slate-900 px-2 text-sm font-bold text-white">
                        https://twitter.com/
                      </p>
                      <Input
                        className="rounded-l-none"
                        placeholder="aNinjaHobo"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Your Twitter handle.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center">
                      <p className="grid h-9 place-items-center rounded-l-md border border-slate-700 bg-slate-900 px-2 text-sm font-bold text-white">
                        https://linkedin.com/in/
                      </p>
                      <Input
                        className="rounded-l-none"
                        placeholder="kennethtylerbass"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Your LinkedIn profile name from linkedin.com/in/profilename.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex=row flex gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                type="button"
                variant="destructive"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
