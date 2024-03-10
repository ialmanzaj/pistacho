import { WagmiProvider, createConfig, http } from "wagmi"
import { avalanche, avalancheFuji } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  ConnectKitProvider,
  getDefaultConfig,
  ConnectKitButton,
} from "connectkit"

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [avalancheFuji],

    // Required API Keys
    walletConnectProjectId: import.meta.env
      .VITE_WALLETCONNECT_PROJECT_ID as string,

    // Required App Info
    appName: "Pistacho",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

const queryClient = new QueryClient()

export const Web3Provider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="soft"
          options={{
            language: "es-ES",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
