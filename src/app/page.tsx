"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/form/Form";
import {
  TextInput,
  FormOTPInput,
  DateInput,
  FileUpload,
  FormattedInput,
  Slider
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppDialog } from "@/components/app";
import {
  toastSuccess,
  toastError,
  toastInfo,
  toastWarning,
} from "@/lib/toast";
import { inputFormatter } from "@/utils/formatters";
import type { DateRange } from "react-day-picker";

type ExampleForm = {
  name: string;
  amount?: string;
  otp?: string;
  date?: Date;
  dateRange?: DateRange;
  files?: File | File[];
  volume?: number;
};

export default function HomePage() {
  const form = useForm<ExampleForm>({
    defaultValues: {
      name: "",
      amount: "",
      otp: "",
      volume: 50
    }
  });

  const onSubmit = (data: ExampleForm) => {
    console.log(data);
    toastSuccess("Form submitted!", "Your data has been saved.");
  };

  return (
    <main className='min-h-screen p-8'>
      <div className='mx-auto max-w-2xl space-y-8'>
        <h1 className='text-2xl font-bold'>Form Components Demo</h1>

        <Card>
          <CardHeader>
            <CardTitle>Dialog & Toasts</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-wrap gap-2'>
            <AppDialog
              trigger={<Button variant='outline'>Open Dialog</Button>}
              title='Dialog Title'
              description='A reusable dialog description.'
              footer={<Button>Confirm</Button>}
              showCloseButton
            >
              <p>Dialog content goes here.</p>
            </AppDialog>
            <Button
              variant='outline'
              onClick={() => toastSuccess("Success!", "Operation completed.")}
            >
              Success Toast
            </Button>
            <Button
              variant='outline'
              onClick={() => toastError("Error!", "Something went wrong.")}
            >
              Error Toast
            </Button>
            <Button
              variant='outline'
              onClick={() => toastInfo("Info", "Here's some information.")}
            >
              Info Toast
            </Button>
            <Button
              variant='outline'
              onClick={() => toastWarning("Warning", "Please be careful.")}
            >
              Warning Toast
            </Button>
          </CardContent>
        </Card>

        <Form form={form} onSubmit={onSubmit} className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Text & Formatted Inputs</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <TextInput
                name='name'
                label='labels.name'
                placeholder='placeholders.name'
                required
              />
              <FormattedInput
                name='amount'
                label='labels.amount'
                formatter={inputFormatter.dollar}
                placeholder='placeholders.amount'
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OTP & Slider</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormOTPInput name='otp' label='labels.otp' length={6} />
              <Slider name='volume' label='labels.volume' min={0} max={100} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Date & File Upload</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <DateInput name='date' label='labels.date' mode='single' />
              <DateInput
                name='dateRange'
                label='labels.startDate'
                mode='range'
              />
              <FileUpload
                name='files'
                label='labels.upload'
                multiple
                maxSize={5 * 1024 * 1024}
              />
            </CardContent>
          </Card>

          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </main>
  );
}
