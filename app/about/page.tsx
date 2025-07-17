"use client";

import { ArrowLeft, Award, Building2, Globe, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const { t } = useTranslation(["about", "navigation"]);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="AI MCN Logo" width={40} height={40} className="animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-red to-red-400 bg-clip-text text-transparent">
                Tomato Planet
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="nav-link">
                {t("nav.home", { ns: "navigation", defaultValue: "Home" })}
              </Link>
              <Link href="/about" className="nav-link text-brand-red">
                {t("nav.about", { ns: "navigation" })}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center text-brand-red hover:text-red-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome", { defaultValue: "Back to Home" })}
            </Link>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-shadow-glow">
              <span className="hero-gradient-text">{t("hero.title", { defaultValue: "About Tomato Planet" })}</span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              {t("hero.subtitle", {
                defaultValue:
                  "We're revolutionizing content creation and distribution through the power of AI and human creativity.",
              })}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 section-gradient-text">
                  {t("mission.title", { defaultValue: "Our Mission" })}
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  {t("mission.description", {
                    defaultValue:
                      "To democratize content creation and empower creators worldwide with cutting-edge AI technology, enabling them to reach global audiences and build sustainable careers.",
                  })}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Heart className="w-6 h-6 text-brand-red mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-2">
                        {t("mission.values.creativity.title", { defaultValue: "Creativity First" })}
                      </h3>
                      <p className="text-gray-400">
                        {t("mission.values.creativity.desc", {
                          defaultValue: "We believe in the power of human creativity enhanced by AI.",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Globe className="w-6 h-6 text-brand-red mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-2">
                        {t("mission.values.global.title", { defaultValue: "Global Reach" })}
                      </h3>
                      <p className="text-gray-400">
                        {t("mission.values.global.desc", {
                          defaultValue: "Connecting creators with audiences worldwide.",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-8">
                <div className="bg-gradient-to-br from-brand-red/20 to-red-500/20 rounded-2xl p-8 text-center">
                  <Building2 className="w-24 h-24 text-brand-red mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t("mission.stats.title", { defaultValue: "Our Impact" })}
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-3xl font-bold text-brand-red">500+</p>
                      <p className="text-gray-400">{t("mission.stats.creators", { defaultValue: "Creators" })}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-brand-red">10M+</p>
                      <p className="text-gray-400">{t("mission.stats.views", { defaultValue: "Views" })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 section-gradient-text">
              {t("team.title", { defaultValue: "Meet Our Team" })}
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
              {t("team.subtitle", {
                defaultValue:
                  "A diverse group of innovators, creators, and technologists passionate about the future of content.",
              })}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Chen",
                  role: t("team.members.ceo.role", { defaultValue: "CEO & Founder" }),
                  bio: t("team.members.ceo.bio", {
                    defaultValue: "Former Google AI researcher with 10+ years in content creation and distribution.",
                  }),
                  icon: Users,
                },
                {
                  name: "Sarah Kim",
                  role: t("team.members.cto.role", { defaultValue: "CTO" }),
                  bio: t("team.members.cto.bio", {
                    defaultValue: "Expert in AI/ML with experience building scalable content platforms.",
                  }),
                  icon: Award,
                },
                {
                  name: "Marcus Rodriguez",
                  role: t("team.members.cpo.role", { defaultValue: "CPO" }),
                  bio: t("team.members.cpo.bio", {
                    defaultValue:
                      "Creative director with deep understanding of creator economy and brand partnerships.",
                  }),
                  icon: Heart,
                },
              ].map((member, index) => (
                <div key={index} className="glass-card p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-brand-red to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <member.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-brand-red mb-4">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center section-gradient-text">
              {t("values.title", { defaultValue: "Our Values" })}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: t("values.innovation.title", { defaultValue: "Innovation" }),
                  desc: t("values.innovation.desc", {
                    defaultValue: "Pushing boundaries in AI and content creation.",
                  }),
                  icon: Award,
                },
                {
                  title: t("values.creativity.title", { defaultValue: "Creativity" }),
                  desc: t("values.creativity.desc", {
                    defaultValue: "Fostering artistic expression and unique content.",
                  }),
                  icon: Heart,
                },
                {
                  title: t("values.community.title", { defaultValue: "Community" }),
                  desc: t("values.community.desc", {
                    defaultValue: "Building supportive networks for creators.",
                  }),
                  icon: Users,
                },
                {
                  title: t("values.excellence.title", { defaultValue: "Excellence" }),
                  desc: t("values.excellence.desc", {
                    defaultValue: "Delivering the highest quality in everything we do.",
                  }),
                  icon: Globe,
                },
              ].map((value, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-red to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="cta-card">
              <div className="p-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t("cta.title", { defaultValue: "Join Our Mission" })}
                </h2>
                <p className="text-xl text-gray-300 mb-10">
                  {t("cta.subtitle", {
                    defaultValue:
                      "Whether you're a creator looking to grow or a brand ready to innovate, we're here to help you succeed.",
                  })}
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <Button size="lg" className="cta-button">
                    {t("cta.getStarted", { defaultValue: "Get Started" })}
                  </Button>
                  <Button size="lg" className="cta-button-secondary">
                    {t("cta.contact", { defaultValue: "Contact Us" })}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
