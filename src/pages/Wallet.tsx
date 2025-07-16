import { useState } from "react";
import { Wallet, CreditCard, Plus, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WalletPage = () => {
  const [rechargeAmount, setRechargeAmount] = useState("");

  const transactions = [
    {
      id: 1,
      type: "credit",
      amount: 5000,
      description: "Account Recharge",
      date: "2024-01-20",
      category: "recharge",
    },
    {
      id: 2,
      type: "debit",
      amount: 240,
      description: "WhatsApp Campaign - AI Course",
      date: "2024-01-19",
      category: "whatsapp",
    },
    {
      id: 3,
      type: "debit",
      amount: 1800,
      description: "Meta Ads - Lead Generation",
      date: "2024-01-18",
      category: "ads",
    },
    {
      id: 4,
      type: "debit",
      amount: 156,
      description: "WhatsApp Templates",
      date: "2024-01-17",
      category: "whatsapp",
    },
    {
      id: 5,
      type: "credit",
      amount: 2500,
      description: "Account Recharge",
      date: "2024-01-15",
      category: "recharge",
    },
  ];

  const quickAmounts = [500, 1000, 2500, 5000];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">💼 Wallet</h1>
          <p className="text-muted-foreground">Manage your credits for campaigns and messaging</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Credits
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹3,204</div>
            <p className="text-xs opacity-90">Available for campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,796</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,890</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Recharge */}
        <Card>
          <CardHeader>
            <CardTitle>⚡ Quick Recharge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => setRechargeAmount(amount.toString())}
                  className="h-12"
                >
                  ₹{amount.toLocaleString()}
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Custom amount"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
              />
              <Button className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Recharge ₹{rechargeAmount || "0"}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Minimum recharge: ₹500</p>
              <p>• Auto-recharge available</p>
              <p>• GST included in pricing</p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Usage Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meta Ads</span>
                  <span>₹1,800 (60%)</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>WhatsApp Messages</span>
                  <span>₹900 (30%)</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Templates & Tools</span>
                  <span>₹300 (10%)</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Total Spent</span>
                <span>₹3,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Info */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>WhatsApp Message</span>
                <span>₹0.80 each</span>
              </div>
              <div className="flex justify-between">
                <span>Meta Ads (CPC)</span>
                <span>₹12-18</span>
              </div>
              <div className="flex justify-between">
                <span>Template Creation</span>
                <span>₹50 each</span>
              </div>
              <div className="flex justify-between">
                <span>AI Ad Generation</span>
                <span>₹25 each</span>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <Badge variant="secondary" className="w-full justify-center">
                <Zap className="w-3 h-3 mr-1" />
                Pay per use model
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>🧾 Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="credit">Credits</TabsTrigger>
              <TabsTrigger value="debit">Debits</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;