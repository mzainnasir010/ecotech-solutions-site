import { Skeleton } from "@/components/ui/skeleton";

export const PortfolioSkeleton = () => (
  <section className="min-h-screen bg-secondary py-20 md:py-28 px-6 lg:px-12">
    <div className="container mx-auto">
      <div className="mb-16">
        <Skeleton className="h-4 w-32 bg-off-white/10 mb-6" />
        <Skeleton className="h-14 w-[70%] bg-off-white/10" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-6">
          <Skeleton className="h-6 w-28 rounded-full bg-off-white/10" />
          <Skeleton className="h-12 w-[80%] bg-off-white/10" />
          <Skeleton className="h-20 w-full bg-off-white/10" />
          <Skeleton className="h-16 w-48 rounded-2xl bg-off-white/10" />
        </div>
        <Skeleton className="aspect-[4/5] rounded-3xl bg-off-white/10" />
      </div>
    </div>
  </section>
);

export const GlobeSkeleton = () => (
  <section className="min-h-screen bg-secondary py-16 md:py-20 px-6 lg:px-12">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <Skeleton className="h-4 w-28 bg-off-white/10" />
          <Skeleton className="h-14 w-[75%] bg-off-white/10" />
          <Skeleton className="h-20 w-full bg-off-white/10" />
          <div className="grid grid-cols-2 gap-4 pt-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl bg-off-white/10" />
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <Skeleton className="w-64 h-64 rounded-full bg-off-white/10" />
        </div>
      </div>
    </div>
  </section>
);

export const TestimonialsSkeleton = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <Skeleton className="h-4 w-24 mx-auto mb-4 bg-muted/40" />
        <Skeleton className="h-10 w-48 mx-auto bg-muted/40" />
      </div>
      <div className="max-w-4xl mx-auto text-center px-8 md:px-16 space-y-8">
        <Skeleton className="h-8 w-full bg-muted/40" />
        <Skeleton className="h-8 w-[90%] mx-auto bg-muted/40" />
        <Skeleton className="h-8 w-[70%] mx-auto bg-muted/40" />
        <div className="flex items-center justify-center gap-4 pt-4">
          <Skeleton className="w-16 h-16 rounded-full bg-muted/40" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-muted/40" />
            <Skeleton className="h-4 w-44 bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ContactSkeleton = () => (
  <section className="min-h-screen bg-background py-20 md:py-28 px-6 lg:px-12">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <Skeleton className="h-4 w-28 mx-auto mb-8 bg-muted/40" />
        <Skeleton className="h-14 w-[50%] mx-auto mb-6 bg-muted/40" />
        <Skeleton className="h-6 w-[40%] mx-auto bg-muted/40" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-muted/40" />
          ))}
        </div>
        <Skeleton className="h-[420px] rounded-3xl bg-muted/40" />
      </div>
    </div>
  </section>
);
