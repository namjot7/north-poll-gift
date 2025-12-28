import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Home'
}
const Home = () => {
    return (
        <>
            {/* Hero  */}
            <div className="flex-center h-[90vh] text-center">
                {/* <Snowfall/> */}
                <div>
                    <h1 className="text-4xl font-bold w-full mb-24 text-white">Gifting Made Easy</h1>
                    {/* <p className="text-gray-700 m-3 mb-5">Discover thoughtful gift ideas and invite others to share, plan, and celebrate together.</p> */}
                    {/* <Link href="/dashboard" className="btn-default rounded-full">Start Now</Link> */}
                </div>
            </div>
            {/* Other sections */}
            {/* <div>
                Finding the perfect gift shouldn’t be stressful — it should be exciting, joyful, and meaningful. That’s why we’re here. Whether you’re celebrating a birthday, anniversary, holiday, or just because, we help you discover thoughtful, personalized gift ideas for the people who matter most.

                Why Choose Us?

                ✨ Personalized Suggestions
                Tell us who you’re gifting for, their interests, and your budget — we’ll guide you to gifts that feel truly special.

                🎯 Gifts for Every Occasion
                From romantic surprises to family-friendly presents, from last-minute ideas to curated luxury picks, we’ve got something for every moment.

                🤝 Friendly Guidance
                Not sure what to choose? Our team (and smart tools) are here to help you narrow it down, compare options, and find a gift that sends the right message.

                Invite, Share & Celebrate Together

                We also make it easy for friends, couples, and families to plan and choose gifts with each other. Invite your loved ones, share ideas, and make gifting a fun experience — not a chore.

                Give Better, Together

                A meaningful gift doesn’t have to be expensive; it just has to be thoughtful. Let us help you create smiles, deepen connections, and turn every occasion into a memory worth keeping.

                Start exploring — your perfect gift idea is just a few clicks away.
            </div> */}
        </>
    )
}

export default Home