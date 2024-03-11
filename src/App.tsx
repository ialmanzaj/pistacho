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
import { encodeFunctionData, parseAbi, parseEther } from "viem"
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
import { useAccount, useReadContract, useWriteContract } from "wagmi"

const startups = [
  {
    name: "QuantumFin",
    description: "Pioneering quantum-inspired financial solutions",
    industry: "Fintech",
    amount: "$90K",
  },
]

const pistachoAddress = "0x75B676CD9fcd4263a7956043F83eceb4488bb85a"
const pistachoABI = parseAbi([
  "function fund(uint256 assets, uint256 projectId) external",
])

const usdc = "0x5425890298aed601595a70ab815c96711a31bc65"

const usdcABI = parseAbi([
  "function balanceOf(address owner) external view returns (uint256 balance)",
])

function Home() {
  const { address: connectedAddress } = useAccount()
  const { data, writeContract } = useWriteContract()

  const balance = useReadContract({
    abi: usdcABI,
    address: usdc,
    functionName: "balanceOf",
    args: [connectedAddress!],
  })
  console.log("balance", balance.data)

  const createProjectSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    amount: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1),
    ),
  })

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      amount: 0,
    },
  })

  function onSubmit(values: z.infer<typeof createProjectSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  const investSchema = z.object({
    amount: z.preprocess(
      (a) => parseInt(z.string().parse(a)),
      z.number().positive().min(1),
    ),
  })

  const investForm = useForm<z.infer<typeof investSchema>>({
    resolver: zodResolver(investSchema),
    defaultValues: {
      amount: 0,
    },
  })

  function onInvest(values: z.infer<typeof investSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    writeContract({
      address: pistachoAddress,
      abi: pistachoABI,
      functionName: "fund",
      args: [BigInt(values.amount * 10 ** 6), BigInt(1)],
    })
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

                      <Form {...investForm}>
                        <form onSubmit={investForm.handleSubmit(onInvest)}>
                          <div className="my-3">
                            <FormField
                              control={investForm.control}
                              name="amount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cuanto quieres invertir</FormLabel>
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
                          </div>
                          <Button
                            variant="default"
                            className="bg-primary"
                            type="submit"
                          >
                            Confirmar
                          </Button>
                        </form>
                      </Form>
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
