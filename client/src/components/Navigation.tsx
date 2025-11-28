import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { PenSquare, LogOut, LogIn, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary/40 transition-all duration-300">
            BlogApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-sm text-muted-foreground font-medium">
                  Welcome, {user?.name}
                </span>
                <Link to="/create">
                  <Button variant="default" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                    <PenSquare className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={signOut} className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {user ? (
                    <>
                      <div className="text-center py-4 border-b">
                        <p className="text-lg font-medium">Welcome, {user?.name}</p>
                      </div>
                      <Link to="/create">
                        <Button variant="default" className="w-full justify-start">
                          <PenSquare className="h-4 w-4 mr-2" />
                          New Post
                        </Button>
                      </Link>
                      <Button variant="outline" onClick={signOut} className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth">
                      <Button variant="default" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;