"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqList = [
  {
    id: "q1",
    question: "What is Job Vista?",
    answer: "Job Vista is a platform designed for students to explore job opportunities, upload resumes, and apply to jobs seamlessly."
  },
  {
    id: "q2",
    question: "How can I apply for a job?",
    answer: "Go to the Jobs section, select a job you're interested in, and click the 'Apply Now' button to submit your application."
  },
  {
    id: "q3",
    question: "How do I upload my resume?",
    answer: "Navigate to your student profile, click on 'Upload Resume', and choose a PDF file from your device to upload."
  },
  {
    id: "q4",
    question: "Can I save jobs to apply later?",
    answer: "Yes, you can bookmark jobs and view them later in the 'Saved Jobs' section of your dashboard."
  },
  {
    id: "q5",
    question: "Will I be notified about my job application status?",
    answer: "Yes, you will receive email notifications for each application update, such as when a recruiter views or accepts your application."
  }
]

const FAQquestions = () => {
  return (
    <div className="w-full md:max-w-md h-fit rounded-lg border mx-auto p-4 bg-white">
      <h2 className="text-lg font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqList.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQquestions
