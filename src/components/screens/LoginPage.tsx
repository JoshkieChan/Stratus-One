import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { StratusButton } from '../StratusButton';
import { StratusInput } from '../StratusInput';
import { StratusLogo } from '../StratusLogo';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-xl)] p-8 border border-[var(--color-border-default)] shadow-[var(--shadow-card)]">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-8">
            <StratusLogo variant="loop" size={48} />
            <h1 className="mt-4">StratusOne OS</h1>
            <p className="text-[var(--color-fg-secondary)] mt-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-[var(--color-danger)]/10 border border-[var(--color-danger)] rounded-lg">
              <p className="text-sm text-[var(--color-danger)]">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <StratusInput
              label="Email"
              type="email"
              placeholder="founder@stratus.one"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <StratusInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <StratusButton
              variant="primary"
              fullWidth
              disabled={loading}
              className="mt-4"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            </StratusButton>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-[var(--color-accent-primary)] hover:underline"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : 'Need an account? Create one'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[var(--color-fg-secondary)] mt-6">
          © 2025 StratusOne OS. All rights reserved.
        </p>
      </div>
    </div>
  );
}
