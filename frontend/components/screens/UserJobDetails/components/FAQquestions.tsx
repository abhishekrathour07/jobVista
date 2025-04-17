"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQquestions = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-lg font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="q1">
          <AccordionTrigger>What is Yaario?</AccordionTrigger>
          <AccordionContent>
            Yaario is a social media platform that lets users share stories, connect with friends, and engage in real-time chat.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger>How do I reset my password?</AccordionTrigger>
          <AccordionContent>
            You can reset your password by clicking on “Forgot Password” on the login page and following the instructions sent to your email.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger>Can I delete my account?</AccordionTrigger>
          <AccordionContent>
            Yes, go to your profile settings and scroll to the bottom to find the “Delete Account” option.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4">
          <AccordionTrigger>How do I upload a resume in Job Vista?</AccordionTrigger>
          <AccordionContent>
            Navigate to your student dashboard, click on “Upload Resume,” and select the PDF file from your device.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q5">
          <AccordionTrigger>Who can see my stories?</AccordionTrigger>
          <AccordionContent>
            Only your friends can view your stories, and they will automatically disappear after 24 hours.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FAQquestions
