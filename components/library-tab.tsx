"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: string;
  dueDate?: string;
  fine?: number;
}

interface DigitalResource {
  id: number;
  title: string;
  type: string;
  url: string;
  accessLevel: string;
}

export function LibraryTab() {
  const [books, setBooks] = useState<Book[]>([]);
  const [digitalResources, setDigitalResources] = useState<DigitalResource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchLibraryData();
  }, []);

  const fetchLibraryData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching library data...');
      const response = await fetch('/api/library');
      console.log('Library API response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Library data received:', data);
      
      if (data.success) {
        setBooks(data.books);
        setDigitalResources(data.digitalResources);
      } else {
        throw new Error(data.message || 'Failed to fetch library data');
      }
    } catch (err) {
      console.error('Error fetching library data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch library data');
      toast({
        title: "Error",
        description: "Failed to load library data. Please try again later.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDigitalResources = digitalResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return <Badge variant="default" className="bg-green-500/20 text-green-500">Available</Badge>;
      case "borrowed":
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">Borrowed</Badge>;
      case "reserved":
        return <Badge variant="destructive" className="bg-red-500/20 text-red-500">Reserved</Badge>;
      default:
        return <Badge variant="default" className="bg-gray-500/20 text-gray-500">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchLibraryData} className="bg-blue-600 hover:bg-blue-700">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search books and resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-400"
          />
        </div>
      </div>

      <Tabs defaultValue="books" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="books" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            <BookOpen className="mr-2 h-4 w-4" />
            Books
          </TabsTrigger>
          <TabsTrigger value="digital" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            <FileText className="mr-2 h-4 w-4" />
            Digital Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-400">No books found</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book, idx) => (
                <Card key={`${book.id}-${idx}`} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{book.title}</CardTitle>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        {book.author}
                      </p>
                      {getStatusBadge(book.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-gray-400">ISBN:</span> {book.isbn}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-gray-400">Category:</span>{" "}
                        {book.category}
                      </p>
                      {book.dueDate && (
                        <p className="text-sm text-gray-300">
                          <span className="font-medium text-gray-400">Due Date:</span>{" "}
                          {new Date(book.dueDate).toLocaleDateString()}
                        </p>
                      )}
                      {book.fine && book.fine > 0 && (
                        <p className="text-sm text-red-400">
                          <span className="font-medium">Fine:</span> ${book.fine}
                        </p>
                      )}
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                        disabled={book.status !== "available"}
                      >
                        {book.status === "available"
                          ? "Borrow Book"
                          : "Not Available"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="digital" className="space-y-4">
          {filteredDigitalResources.length === 0 ? (
            <p className="text-center text-gray-400">
              No digital resources found
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDigitalResources.map((resource, idx) => (
                <Card key={`${resource.id}-${idx}`} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{resource.title}</CardTitle>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        {resource.type}
                      </p>
                      <Badge variant="default" className="bg-blue-500/20 text-blue-500">
                        {resource.accessLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => window.open(resource.url, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 