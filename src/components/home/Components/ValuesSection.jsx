import React from 'react'

export default function ValuesSection() {
    return (
        <section className="bg-secondary/30 py-16 md:py-20">
            <div className="container-wide">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="font-medium mb-2">Free Shipping</h3>
                        <p className="text-sm text-muted-foreground">On orders over $100</p>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">Easy Returns</h3>
                        <p className="text-sm text-muted-foreground">30-day return policy</p>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">Secure Checkout</h3>
                        <p className="text-sm text-muted-foreground">Encrypted transactions</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
