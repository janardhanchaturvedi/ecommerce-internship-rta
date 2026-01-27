import { LogOut, Menu, ShoppingBag, User, X } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { UserContext } from '@/contexts/UserContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function Header() {
    const user = useContext(UserContext);
    const logout = () => {

    }
    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <nav className="container-wide">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="font-display text-xl font-medium tracking-tight">
                        MINIMAL
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/products"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Shop
                        </Link>
                        <Link
                            to="/products?category=Home"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products?category=Kitchen"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Kitchen
                        </Link>
                        <Link
                            to="/products?category=Accessories"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Accessories
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" aria-label="User menu">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <div className="px-2 py-1.5">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
                                <Link to="/login">Sign in</Link>
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            // onClick={toggleCart}
                            aria-label="Open cart"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {/* {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground text-background text-xs font-medium flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )} */}
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            //   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {/* {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />} */}
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
