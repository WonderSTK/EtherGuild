#!/bin/bash

# EtherGuild Deployment Script
# This script helps deploy your Web3 platform to production

set -e  # Exit on error

echo "🚀 EtherGuild Deployment Script"
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from example..."
    cp .env.example .env
    print_warning "Please update .env file with your actual values before proceeding!"
    exit 1
fi

# Menu for deployment options
echo
echo "Please select deployment target:"
echo "1) Deploy Smart Contract to Sepolia Testnet"
echo "2) Deploy Smart Contract to Ethereum Mainnet"
echo "3) Deploy Frontend to Vercel"
echo "4) Full Deployment (Smart Contract + Frontend)"
echo "5) Local Development Setup"
echo "0) Exit"
echo

read -p "Enter your choice [0-5]: " choice

case $choice in
    1)
        print_status "Deploying to Sepolia Testnet..."
        npm run compile
        npx hardhat run scripts/deploy-production.cjs --network sepolia
        print_success "Smart contract deployed to Sepolia!"
        print_status "Don't forget to update VITE_CONTRACT_ADDRESS in your Vercel environment variables"
        ;;
    2)
        print_warning "⚠️  MAINNET DEPLOYMENT - This will cost real ETH!"
        read -p "Are you sure you want to deploy to mainnet? (y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            print_status "Deploying to Ethereum Mainnet..."
            npm run compile
            npx hardhat run scripts/deploy-production.cjs --network mainnet
            print_success "Smart contract deployed to Mainnet!"
            print_status "Don't forget to update VITE_CONTRACT_ADDRESS and VITE_CHAIN_ID=1 in Vercel"
        else
            print_status "Mainnet deployment cancelled."
        fi
        ;;
    3)
        print_status "Building frontend for production..."
        npm run build
        print_status "Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
            print_success "Frontend deployed to Vercel!"
        else
            print_warning "Vercel CLI not found. Installing..."
            npm install -g vercel
            vercel --prod
            print_success "Frontend deployed to Vercel!"
        fi
        ;;
    4)
        print_status "Starting full deployment..."
        print_warning "This will deploy smart contract to Sepolia and frontend to Vercel"
        read -p "Continue? (y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            # Deploy smart contract
            print_status "Deploying smart contract to Sepolia..."
            npm run compile
            npx hardhat run scripts/deploy-production.cjs --network sepolia
            
            # Deploy frontend
            print_status "Building and deploying frontend..."
            npm run build
            if command -v vercel &> /dev/null; then
                vercel --prod
            else
                npm install -g vercel
                vercel --prod
            fi
            
            print_success "Full deployment completed!"
            print_warning "Don't forget to update VITE_CONTRACT_ADDRESS in Vercel environment variables"
        else
            print_status "Full deployment cancelled."
        fi
        ;;
    5)
        print_status "Setting up local development environment..."
        npm install
        print_status "Starting Hardhat node..."
        npx hardhat node &
        HARDHAT_PID=$!
        sleep 5
        print_status "Deploying contracts locally..."
        npx hardhat run scripts/deploy-production.cjs --network localhost
        print_status "Starting development server..."
        npm run dev &
        DEV_PID=$!
        
        print_success "Local development environment is ready!"
        print_status "Frontend: http://localhost:8080"
        print_status "Hardhat node: http://localhost:8545"
        print_warning "Press Ctrl+C to stop all services"
        
        # Wait for interrupt
        trap "kill $HARDHAT_PID $DEV_PID 2>/dev/null; exit" INT
        wait
        ;;
    0)
        print_status "Exiting deployment script."
        exit 0
        ;;
    *)
        print_error "Invalid option. Please choose 0-5."
        exit 1
        ;;
esac

echo
print_success "Deployment script completed!"
echo
print_status "Next steps:"
echo "  • Test your deployment thoroughly"
echo "  • Update documentation with new addresses"
echo "  • Monitor smart contract interactions"
echo "  • Share your dApp with the community!"
echo
