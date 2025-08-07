import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, Wallet, Globe, Moon, Sun, Monitor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    jobAlerts: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEarnings: false,
    showLocation: true
  });

  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("ETH");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security settings</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card/50 border border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="Sarah Rodriguez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input id="title" defaultValue="Full-Stack Web3 Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Barcelona, Spain" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Hourly Rate</Label>
                    <Input id="hourly-rate" defaultValue="0.05" />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Wallet Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Connected Wallet</Label>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">MetaMask</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            0x742d35Cc...C0C5A0
                          </div>
                        </div>
                        <Button variant="surface" size="sm">Change</Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Preferred Network</Label>
                    <Select defaultValue="ethereum">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                        <SelectItem value="optimism">Optimism</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gas Settings</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow (Low Gas)</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="fast">Fast (High Gas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-8">
            <Card className="bg-card/50 border border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive important updates via email
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Get instant notifications in your browser
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Job Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about new jobs matching your skills
                    </div>
                  </div>
                  <Switch
                    checked={notifications.jobAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, jobAlerts: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Marketing Communications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive newsletters and promotional content
                    </div>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, marketing: checked }))
                    }
                  />
                </div>
                
                <Button className="w-full">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-8">
            <Card className="bg-card/50 border border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Profile Visibility</div>
                    <div className="text-sm text-muted-foreground">
                      Allow others to find and view your profile
                    </div>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, profileVisible: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Show Earnings</div>
                    <div className="text-sm text-muted-foreground">
                      Display your total earnings on your profile
                    </div>
                  </div>
                  <Switch
                    checked={privacy.showEarnings}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, showEarnings: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Show Location</div>
                    <div className="text-sm text-muted-foreground">
                      Display your location to potential clients
                    </div>
                  </div>
                  <Switch
                    checked={privacy.showLocation}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, showLocation: checked }))
                    }
                  />
                </div>
                
                <Button className="w-full">Save Privacy Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card/50 border border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Not Enabled</div>
                          <div className="text-sm text-muted-foreground">
                            Add an extra layer of security
                          </div>
                        </div>
                        <Button variant="surface" size="sm">Enable</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Session Management</Label>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Active Sessions: 2</div>
                          <div className="text-sm text-muted-foreground">
                            Manage your active sessions
                          </div>
                        </div>
                        <Button variant="surface" size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Backup Recovery Phrase</Label>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Backup Status: Secured</div>
                          <div className="text-sm text-muted-foreground">
                            Your wallet recovery phrase is backed up
                          </div>
                        </div>
                        <Button variant="surface" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Export Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of all your data stored on EtherGuild
                    </p>
                    <Button variant="surface" className="w-full">
                      Request Data Export
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card/50 border border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="DAI">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={theme === "light" ? "default" : "surface"}
                        size="sm"
                        onClick={() => setTheme("light")}
                        className="flex items-center gap-2"
                      >
                        <Sun className="w-4 h-4" />
                        Light
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "surface"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className="flex items-center gap-2"
                      >
                        <Moon className="w-4 h-4" />
                        Dark
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "surface"}
                        size="sm"
                        onClick={() => setTheme("system")}
                        className="flex items-center gap-2"
                      >
                        <Monitor className="w-4 h-4" />
                        System
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
