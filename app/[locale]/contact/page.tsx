"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function ContactPage() {
  const t = useTranslations("Contact")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      form.reset()
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
      })
    }, 1500)
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="text-xl text-muted-foreground mb-10">{t("description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="What's this about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message..." className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Other Ways to Connect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-muted-foreground">contact@next-js-knowledge-library.com</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">GitHub</h3>
                <p className="text-muted-foreground">
                  <a
                    href="https://github.com/nextjs-knowledge-library"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    github.com/nextjs-knowledge-library
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Twitter</h3>
                <p className="text-muted-foreground">
                  <a
                    href="https://twitter.com/nextjs_knowledge"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    @nextjs_knowledge
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">How do I contribute?</h3>
                <p className="text-muted-foreground">
                  Check out our{" "}
                  <a href="/en/contribute" className="text-primary hover:underline">
                    contribution guidelines
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">I found a bug, what should I do?</h3>
                <p className="text-muted-foreground">
                  Please report bugs on our{" "}
                  <a
                    href="https://github.com/nextjs-knowledge-library/issues"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    GitHub issues page
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Can I use your content in my project?</h3>
                <p className="text-muted-foreground">
                  Yes, our content is available under MIT license. Attribution is appreciated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
