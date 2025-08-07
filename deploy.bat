@echo off
setlocal enabledelayedexpansion

echo 🚀 EtherGuild Deployment Script (Windows)
echo =========================================

REM Check if .env file exists
if not exist ".env" (
    echo [WARNING] .env file not found. Creating from example...
    copy ".env.example" ".env"
    echo [WARNING] Please update .env file with your actual values before proceeding!
    pause
    exit /b 1
)

:menu
echo.
echo Please select deployment target:
echo 1^) Deploy Smart Contract to Sepolia Testnet
echo 2^) Deploy Smart Contract to Ethereum Mainnet  
echo 3^) Deploy Frontend to Vercel
echo 4^) Full Deployment ^(Smart Contract + Frontend^)
echo 5^) Local Development Setup
echo 0^) Exit
echo.

set /p choice="Enter your choice [0-5]: "

if "%choice%"=="1" goto sepolia
if "%choice%"=="2" goto mainnet
if "%choice%"=="3" goto vercel
if "%choice%"=="4" goto full
if "%choice%"=="5" goto local
if "%choice%"=="0" goto exit
echo Invalid option. Please choose 0-5.
goto menu

:sepolia
echo [INFO] Deploying to Sepolia Testnet...
call npm run compile
call npx hardhat run scripts/deploy-production.cjs --network sepolia
echo [SUCCESS] Smart contract deployed to Sepolia!
echo [INFO] Don't forget to update VITE_CONTRACT_ADDRESS in your Vercel environment variables
goto end

:mainnet
echo [WARNING] ⚠️ MAINNET DEPLOYMENT - This will cost real ETH!
set /p confirm="Are you sure you want to deploy to mainnet? (y/N): "
if /i not "%confirm%"=="y" (
    echo [INFO] Mainnet deployment cancelled.
    goto end
)
echo [INFO] Deploying to Ethereum Mainnet...
call npm run compile
call npx hardhat run scripts/deploy-production.cjs --network mainnet
echo [SUCCESS] Smart contract deployed to Mainnet!
echo [INFO] Don't forget to update VITE_CONTRACT_ADDRESS and VITE_CHAIN_ID=1 in Vercel
goto end

:vercel
echo [INFO] Building frontend for production...
call npm run build
echo [INFO] Deploying to Vercel...
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] Vercel CLI not found. Installing...
    call npm install -g vercel
)
call vercel --prod
echo [SUCCESS] Frontend deployed to Vercel!
goto end

:full
echo [INFO] Starting full deployment...
echo [WARNING] This will deploy smart contract to Sepolia and frontend to Vercel
set /p confirm="Continue? (y/N): "
if /i not "%confirm%"=="y" (
    echo [INFO] Full deployment cancelled.
    goto end
)

REM Deploy smart contract
echo [INFO] Deploying smart contract to Sepolia...
call npm run compile
call npx hardhat run scripts/deploy-production.cjs --network sepolia

REM Deploy frontend
echo [INFO] Building and deploying frontend...
call npm run build
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    call npm install -g vercel
)
call vercel --prod

echo [SUCCESS] Full deployment completed!
echo [WARNING] Don't forget to update VITE_CONTRACT_ADDRESS in Vercel environment variables
goto end

:local
echo [INFO] Setting up local development environment...
call npm install
echo [INFO] Starting Hardhat node...
start "Hardhat Node" cmd /k "npx hardhat node"
timeout /t 5 /nobreak >nul
echo [INFO] Deploying contracts locally...
call npx hardhat run scripts/deploy-production.cjs --network localhost
echo [INFO] Starting development server...
start "Dev Server" cmd /k "npm run dev"

echo [SUCCESS] Local development environment is ready!
echo [INFO] Frontend: http://localhost:8080
echo [INFO] Hardhat node: http://localhost:8545
goto end

:exit
echo [INFO] Exiting deployment script.
exit /b 0

:end
echo.
echo [SUCCESS] Deployment script completed!
echo.
echo [INFO] Next steps:
echo   • Test your deployment thoroughly
echo   • Update documentation with new addresses  
echo   • Monitor smart contract interactions
echo   • Share your dApp with the community!
echo.
pause
