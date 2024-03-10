import { SiteHeader } from "@/components/site-header"
import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "./components/tailwind-indicator"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAccount, useReadContract } from "wagmi"

const startups = [
  {
    name: "QuantumFin",
    description: "Pioneering quantum-inspired financial solutions",
    industry: "Fintech",
    amount: "$90K",
  },
  {
    name: "MediNova",
    description: "Redefining healthcare with advanced tech innovations",
    industry: "HealthTech",
    amount: "$50K",
  },
  {
    name: "GreenEco",
    description: "Leading the way in eco-friendly technology development",
    industry: "EcoTech",
    amount: "$10K",
  },
]

function Home() {
  const { address: connectedAddress } = useAccount();

  const { data: usdcBalance } = useReadContract({
    contractName: "USDC",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    amount: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1)
      )
  })

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      amount: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <section className="container flex items-center pb-8 pt-6 md:py-10">
      <div className="flex flex-col gap-3">
        <div>
          <Dialog>
            <DialogTrigger>
              <Button variant="default" className="bg-sky-300 hover:bg-sky-500">
                Crear proyecto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Form {...form}>
                <DialogHeader>
                  <DialogTitle>Detalla tu proyecto</DialogTitle>
                  <DialogDescription>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="XYZ project" {...field} />
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
                                placeholder="de que trata el proyecto"
                                {...field}
                                
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cuanto estan recaudando</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Monto"
                                type="text"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        variant="default"
                        className="bg-sky-300 hover:bg-sky-500"
                      >
                        Crear
                      </Button>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-wrap items-start gap-3">
          {startups.map((startup, index) => (
            <Card key={index} className="w-[250px]">
              <CardHeader>
                <CardTitle>{startup.name}</CardTitle>
                <CardDescription>
                  {startup.description}
                  <p className="my-1 font-bold">
                    Amount Raising: {startup.amount}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{startup.industry}</Badge>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="default" className="bg-primary">
                      Invertir
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cuanto quieres invertir?</DialogTitle>
                      <DialogDescription>
                        <div className="my-3">
                          <Label htmlFor="amount" className="my-2 text-right">
                            Cantidad
                          </Label>
                          <Input
                            id="amount"
                            value={0.0}
                            className="col-span-3"
                          />
                        </div>

                        <Button variant="default" className="bg-primary">
                          Confirmar
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const routes = [{ path: "/", element: <Home /> }]

function App() {
  const children = useRoutes(routes)

  return (
    <>
      <div className="relative flex min-h-screen flex-col ">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </div>
      <TailwindIndicator />
    </>
  )
}

export default App
