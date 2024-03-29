import { Button } from "@/components/ui/button";
import { LoadingInput } from "@/components/ui/form/loading/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2 } from "lucide-react";

export const InformationFormLoading = () => {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-4">
        <LoadingInput title="Title" />
        <LoadingInput title="Description" />
        <LoadingInput title="Icon" className="h-28" />
        <Separator />
        <p className="font-semibold leading-none tracking-tight">Socials</p>
        <LoadingInput title="GitHub" />
        <LoadingInput title="BitBucket" />
        <LoadingInput title="GitLab" />
        <LoadingInput title="CodePen" />
        <LoadingInput title="Twitter" />
        <LoadingInput title="LinkedIn" />
      </div>
      <footer className="flex w-full flex-row justify-end gap-2">
        <Button disabled={true} type="button" variant="destructive">
          Reset
        </Button>
        <Button disabled={true}>
          <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
          Save
        </Button>
      </footer>
    </div>
  );
};
