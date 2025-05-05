"use client"

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  Building,
  FileDown,
  Printer,
  Share2,
  AlertTriangle,
  HelpCircle,
  Download,
  ChevronRight,
  Info
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const documentData = getDocumentData(params.id)
  
  if (!documentData) {
    return notFound()
  }
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/apps/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Back to Document Wizard
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{documentData.category}</Badge>
                  <Badge className={getComplexityColor(documentData.complexity)}>
                    {documentData.complexity.charAt(0).toUpperCase() + documentData.complexity.slice(1)} Complexity
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{documentData.title}</CardTitle>
                <CardDescription className="text-base">{documentData.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-4 py-4 border-y">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Processing time: {documentData.timeTaken}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>Issuing authority: {documentData.issuingAuthority}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Validity: {documentData.validity}</span>
                  </div>
                </div>
                
                <Tabs defaultValue="steps" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="steps">Application Steps</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="steps" className="mt-4">
                    <div className="space-y-4">
                      {documentData.steps.map((step, index) => (
                        <StepCard 
                          key={index}
                          number={index + 1} 
                          title={step.title} 
                          description={step.description} 
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="requirements" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Required Documents</CardTitle>
                        <CardDescription>
                          Make sure you have all these documents ready before applying
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {documentData.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">{requirement.title}</p>
                                <p className="text-sm text-muted-foreground">{requirement.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    {documentData.fees && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">Fees & Charges</CardTitle>
                          <CardDescription>
                            Applicable fees for obtaining this document
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {documentData.fees.map((fee, index) => (
                              <li key={index} className="flex items-start justify-between">
                                <div className="flex items-start gap-2">
                                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                  <span>{fee.title}</span>
                                </div>
                                <span className="font-medium">NPR {fee.amount}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  <TabsContent value="faqs" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                        <CardDescription>
                          Common questions about this document
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {documentData.faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Button asChild>
                  <Link href={`/apps/documents/${params.id}/apply`}>
                    Start Application
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" asChild>
                  <Link href={`/apps/documents/${params.id}/apply`}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Start Application
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Application Form
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Get Help
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nearest Offices</CardTitle>
                <CardDescription>
                  Where to apply for this document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {documentData.offices.map((office, index) => (
                    <li key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="font-medium">{office.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{office.address}</div>
                      <div className="text-sm text-muted-foreground">{office.contact}</div>
                      <div className="text-sm mt-1">
                        Hours: <span className="text-muted-foreground">{office.hours}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {documentData.importantNotice}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepCard({ number, title, description }: { number: number, title: string, description: string }) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-6">
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-foreground border border-primary text-primary font-medium">
          {number}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function getComplexityColor(complexity: string) {
  const colors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  }
  
  return colors[complexity as keyof typeof colors] || colors.medium
}

function getDocumentData(id: string) {
  // This is mock data. In a real application, this would come from a database or API
  const documents = {
    'citizenship': {
      id: 'citizenship',
      title: 'Citizenship Certificate',
      description: 'Primary national identity document for Nepali citizens',
      category: 'Essential Documents',
      complexity: 'high',
      timeTaken: '3-4 weeks',
      issuingAuthority: 'District Administration Office',
      validity: 'Lifetime',
      steps: [
        {
          title: 'Fill the application form',
          description: 'Obtain and fill the citizenship application form from your local District Administration Office.'
        },
        {
          title: 'Gather required documents',
          description: 'Collect your birth certificate, parent\'s citizenship, and other supporting documents.'
        },
        {
          title: 'Get local ward recommendation',
          description: 'Visit your local ward office to get a recommendation letter.'
        },
        {
          title: 'Submit at District Administration Office',
          description: 'Submit your application with all required documents at the DAO.'
        },
        {
          title: 'Verification and interview',
          description: 'Attend an interview with DAO officials for verification.'
        },
        {
          title: 'Photo and biometrics',
          description: 'Get your photo taken and provide biometric information.'
        },
        {
          title: 'Collect your citizenship',
          description: 'Return to collect your citizenship certificate on the specified date.'
        }
      ],
      requirements: [
        {
          title: 'Birth certificate',
          description: 'Original and photocopy'
        },
        {
          title: 'Parent\'s citizenship certificate',
          description: 'Original and photocopy'
        },
        {
          title: 'Recent passport-sized photos',
          description: '4 copies with white background'
        },
        {
          title: 'Local ward recommendation',
          description: 'Original recommendation letter from your ward office'
        },
        {
          title: 'Educational certificates',
          description: 'If available, as supporting documents'
        }
      ],
      fees: [
        {
          title: 'Application Fee',
          amount: '10'
        },
        {
          title: 'Processing Fee',
          amount: '0'
        }
      ],
      faqs: [
        {
          question: 'What is the minimum age to apply for citizenship?',
          answer: 'You must be at least 16 years old to apply for Nepali citizenship.'
        },
        {
          question: 'Can I apply for citizenship from any district?',
          answer: 'No, you must apply from the district where your permanent address is located or where your parents have their citizenship registered.'
        },
        {
          question: 'What if my parents don\'t have citizenship certificates?',
          answer: 'If your parents don\'t have citizenship certificates, the process becomes more complex. You may need to first help your parents obtain their citizenship before applying for yours.'
        },
        {
          question: 'How long is the citizenship certificate valid?',
          answer: 'The citizenship certificate is valid for a lifetime and doesn\'t need renewal. However, you should keep it safely as it\'s a primary identification document.'
        },
        {
          question: 'What if I lose my citizenship certificate?',
          answer: 'If you lose your citizenship certificate, you need to apply for a duplicate copy at the same District Administration Office where you got your original certificate. You\'ll need to provide a police report about the lost document.'
        }
      ],
      offices: [
        {
          name: 'Kathmandu District Administration Office',
          address: 'Babar Mahal, Kathmandu',
          contact: '01-4256789',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Lalitpur District Administration Office',
          address: 'Pulchowk, Lalitpur',
          contact: '01-5521345',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Bhaktapur District Administration Office',
          address: 'Suryabinayak, Bhaktapur',
          contact: '01-6612345',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        }
      ],
      importantNotice: 'As per the latest government directive, biometric information is now mandatory for all new citizenship applications. Please ensure you bring valid identification for the biometric registration process.'
    },
    'passport': {
      id: 'passport',
      title: 'Passport',
      description: 'International travel document issued by the government',
      category: 'Travel Documents',
      complexity: 'high',
      timeTaken: '4-6 weeks',
      issuingAuthority: 'Department of Passport',
      validity: '10 years',
      steps: [
        {
          title: 'Fill the passport application form',
          description: 'Fill the passport application form online or collect it from the Department of Passport.'
        },
        {
          title: 'Pay the passport fee',
          description: 'Pay the required fee at the specified bank.'
        },
        {
          title: 'Submit documents at DAO or DOP',
          description: 'Submit your application with required documents at District Administration Office or Department of Passport.'
        },
        {
          title: 'Biometric data collection',
          description: 'Provide your fingerprints and digital photograph.'
        },
        {
          title: 'Verification process',
          description: 'Your application will go through a verification process.'
        },
        {
          title: 'Collect your passport',
          description: 'Return to collect your passport on the specified date.'
        }
      ],
      requirements: [
        {
          title: 'Citizenship Certificate',
          description: 'Original and photocopy'
        },
        {
          title: 'Passport-sized photos',
          description: '2 recent photos with white background'
        },
        {
          title: 'Passport application form',
          description: 'Duly filled and signed'
        },
        {
          title: 'Fee payment receipt',
          description: 'Original bank voucher of fee payment'
        }
      ],
      fees: [
        {
          title: 'Regular Processing',
          amount: '5,000'
        },
        {
          title: 'Fast Track Processing',
          amount: '10,000'
        },
        {
          title: 'Express Service',
          amount: '15,000'
        }
      ],
      faqs: [
        {
          question: 'How long does it take to get a passport?',
          answer: 'For regular processing, it takes about 4-6 weeks. Fast track processing takes about 2 weeks, and express service takes about 3-7 days.'
        },
        {
          question: 'Can children apply for a passport?',
          answer: 'Yes, minors can apply for a passport with consent from their parents or legal guardians. Additional documents may be required.'
        },
        {
          question: 'What is the validity period of a Nepali passport?',
          answer: 'A regular Nepali passport is valid for 10 years from the date of issue. After expiration, you need to apply for a new passport.'
        },
        {
          question: 'Can I apply for a passport from any district?',
          answer: 'Yes, you can apply for a passport from any District Administration Office in Nepal, regardless of where your citizenship was issued.'
        },
        {
          question: 'What if my passport is damaged or lost?',
          answer: 'If your passport is damaged or lost, you need to apply for a new passport. For lost passports, you\'ll need to file a police report and submit it along with your application.'
        }
      ],
      offices: [
        {
          name: 'Department of Passport',
          address: 'Narayanhiti Path, Kathmandu',
          contact: '01-4416011',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Kathmandu District Administration Office',
          address: 'Babar Mahal, Kathmandu',
          contact: '01-4256789',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Nepali Consulate General',
          address: 'Various international locations',
          contact: 'Varies by location',
          hours: 'Varies by location'
        }
      ],
      importantNotice: 'As per new regulations, all passport applicants must appear in person for biometric data collection. Machine-readable passports are being phased out and replaced with e-passports. Please check the latest requirements before applying.'
    },
    'birth-certificate': {
      id: 'birth-certificate',
      title: 'Birth Certificate',
      description: 'Official record of birth issued by the government',
      category: 'Essential Documents',
      complexity: 'medium',
      timeTaken: '2-3 weeks',
      issuingAuthority: 'Local Municipal Office',
      validity: 'Lifetime',
      steps: [
        {
          title: 'Fill the birth registration form',
          description: 'Obtain and fill the birth registration form from your local municipal office or ward office.'
        },
        {
          title: 'Gather required documents',
          description: 'Collect hospital discharge papers, parents\' identification, and other supporting documents.'
        },
        {
          title: 'Submit at local ward office',
          description: 'Submit your application with all required documents at the ward office.'
        },
        {
          title: 'Verification process',
          description: 'The ward office will verify your documents and information.'
        },
        {
          title: 'Collect the birth certificate',
          description: 'Return to collect the birth certificate on the specified date.'
        }
      ],
      requirements: [
        {
          title: 'Hospital discharge papers',
          description: 'Original and photocopy (if born in hospital)'
        },
        {
          title: 'Parents\' citizenship certificates',
          description: 'Original and photocopies'
        },
        {
          title: 'Marriage certificate of parents',
          description: 'Original and photocopy (if applicable)'
        },
        {
          title: 'Recent photos of the child',
          description: '2 passport-sized photos'
        },
        {
          title: 'Local witness (for home births)',
          description: 'If born at home, a local witness must accompany'
        }
      ],
      fees: [
        {
          title: 'Registration within 35 days of birth',
          amount: '0'
        },
        {
          title: 'Late registration fee',
          amount: '200'
        }
      ],
      faqs: [
        {
          question: 'Is there a deadline for birth registration?',
          answer: 'Yes, births should be registered within 35 days. After that, late registration fees apply.'
        },
        {
          question: 'Who can register a birth?',
          answer: 'Parents, legal guardians, or adult family members can register a birth.'
        },
        {
          question: 'What if the birth occurred at home?',
          answer: 'For home births, you\'ll need a witness from the local community who can testify to the birth event.'
        },
        {
          question: 'Can I register a birth if parents don\'t have citizenship?',
          answer: 'Yes, but it may require additional documentation and verification. Contact your local ward office for specific requirements.'
        },
        {
          question: 'How can I correct information on a birth certificate?',
          answer: 'To correct information, you need to submit an application for correction at the same office where the birth was registered, along with supporting documents.'
        }
      ],
      offices: [
        {
          name: 'Kathmandu Metropolitan City Office',
          address: 'Bagdarbar, Kathmandu',
          contact: '01-4232751',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Lalitpur Metropolitan City Office',
          address: 'Pulchowk, Lalitpur',
          contact: '01-5521312',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Bhaktapur Municipality Office',
          address: 'Bhaktapur Durbar Square',
          contact: '01-6610040',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        }
      ],
      importantNotice: 'Birth registration is mandatory and crucial for establishing identity and accessing government services throughout life. Register births within 35 days to avoid late fees and complications.'
    },
    'driving-license': {
      id: 'driving-license',
      title: 'Driving License',
      description: 'License to operate motor vehicles on public roads',
      category: 'Transportation',
      complexity: 'medium',
      timeTaken: '3-4 weeks',
      issuingAuthority: 'Department of Transport Management',
      validity: '5 years',
      steps: [
        {
          title: 'Apply online',
          description: 'Fill the online application form on the Department of Transport Management website.'
        },
        {
          title: 'Pay the examination fee',
          description: 'Pay the required fee through online payment or at designated banks.'
        },
        {
          title: 'Book examination date',
          description: 'Select your preferred date for written and practical exams.'
        },
        {
          title: 'Take written examination',
          description: 'Pass the written test about traffic rules and vehicle operation.'
        },
        {
          title: 'Take trial (practical) examination',
          description: 'Pass the practical driving test.'
        },
        {
          title: 'Submit biometric data',
          description: 'Provide your photo, signature, and fingerprints.'
        },
        {
          title: 'Collect your license',
          description: 'Collect your driving license on the specified date or by post.'
        }
      ],
      requirements: [
        {
          title: 'Citizenship Certificate',
          description: 'Original and photocopy'
        },
        {
          title: 'Blood group report',
          description: 'From a recognized laboratory'
        },
        {
          title: 'Medical certificate',
          description: 'From a registered medical practitioner'
        },
        {
          title: 'Passport-sized photos',
          description: '3 recent photos with white background'
        },
        {
          title: 'Training certificate',
          description: 'From a registered driving school (recommended but not mandatory)'
        }
      ],
      fees: [
        {
          title: 'Application Fee',
          amount: '50'
        },
        {
          title: 'Written Exam Fee',
          amount: '200'
        },
        {
          title: 'Practical Exam Fee',
          amount: '300'
        },
        {
          title: 'License Issuance Fee',
          amount: '1,000'
        }
      ],
      faqs: [
        {
          question: 'What is the minimum age for a driving license in Nepal?',
          answer: 'The minimum age is 18 years for motorcycles and light vehicles, and 21 years for heavy vehicles.'
        },
        {
          question: 'Do I need to pass both written and practical exams?',
          answer: 'Yes, you must pass both exams. If you fail either, you\'ll need to retake that specific exam.'
        },
        {
          question: 'Can I apply for multiple categories of vehicles?',
          answer: 'Yes, you can apply for multiple categories, but you\'ll need to pass the practical test for each category.'
        },
        {
          question: 'How long is a driving license valid?',
          answer: 'A Nepali driving license is valid for 5 years and needs to be renewed before expiration.'
        },
        {
          question: 'What happens if I fail the driving test?',
          answer: 'If you fail the test, you can reapply and retake the test after a waiting period, usually 15-30 days.'
        }
      ],
      offices: [
        {
          name: 'Transport Management Office, Ekantakuna',
          address: 'Ekantakuna, Lalitpur',
          contact: '01-5553777',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Transport Management Office, Chabahil',
          address: 'Chabahil, Kathmandu',
          contact: '01-4498851',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        },
        {
          name: 'Transport Management Office, Thulo Bharyang',
          address: 'Thulo Bharyang, Kathmandu',
          contact: '01-4276145',
          hours: 'Sunday-Friday, 10:00 AM - 4:00 PM'
        }
      ],
      importantNotice: 'Nepal has transitioned to smart driving licenses. The application process is now primarily online, and applicants must book examination dates through the online portal. Please ensure you have a valid email address and phone number for communications.'
    }
  }
  
  return documents[id as keyof typeof documents]
}