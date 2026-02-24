import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const login = () => {

    }
    const loginUserDetail = localStorage.getItem("user")
    console.log("loginUserDetail", loginUserDetail)
    // const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (loginUserDetail) {
        navigate("/seller/dashboard")
    }

    const from = (location.state)?.from || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError('');
        // setIsLoading(true);

        // const result = await login(email, password);

        // if (result.success) {
        //     navigate(from, { replace: true });
        // } else {
        //     setError(result.error || 'Login failed');
        // }

        // setIsLoading(false);
        // const registrationKaEmail = localStorage.getItem("email");
        // const registrationKaPassword = localStorage.getItem("password")

        // if (registrationKaEmail === email && password === registrationKaPassword) {
        //     navigate("/dashboard")
        // }

        const data = {
            email: email,
            password: password
        }
        const response = await axios.post("http://localhost:3001/login", data)
        console.log("response", response?.data)
        if (response?.data?.success === true) {
            toast.success(response?.data?.message)
            const loggedInData = {
                email: response?.data?.data?.email,
                fullName: response?.data?.data?.fullName,
                _id: response?.data?.data?._id
            }
            localStorage.setItem("user", JSON.stringify(loggedInData))
            navigate("/seller/dashboard")
        }
    };
    useEffect(() => {
        if (loginUserDetail) {
            navigate("/seller/dashboard")
        }

    }, [loginUserDetail])

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Toaster />
            <Header />

            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl font-medium text-foreground mb-2">
                            Welcome back
                        </h1>
                        <p className="text-muted-foreground">
                            Sign in to your account to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>

                    <p className="text-center mt-6 text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-foreground font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
