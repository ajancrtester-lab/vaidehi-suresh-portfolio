import { useState, useEffect } from 'react';
import { FileText, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from '../hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ContentEditor = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/content`);
      const data = await response.json();
      
      // Initialize with default structure if empty
      const initialContent = data.content || {};
      
      // Ensure services structure exists
      if (!initialContent.services) {
        initialContent.services = {
          en: {
            title: 'Services Offered',
            subtitle: 'Traditional & Modern Performances',
            items: []
          },
          ml: {
            title: 'സേവനങ്ങൾ',
            subtitle: 'പരമ്പരാഗത സംഗീതം',
            items: []
          }
        };
      }
      
      setContent(initialContent);
    } catch (error) {
      console.error('Failed to load content:', error);
      // Set default structure on error
      setContent({
        services: {
          en: { title: '', subtitle: '', items: [] },
          ml: { title: '', subtitle: '', items: [] }
        }
      });
      toast({
        title: 'Error',
        description: 'Failed to load content',
        variant: 'destructive',
      });
    }
  };

  const updateField = (section, language, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [language]: {
          ...prev[section]?.[language],
          [field]: value
        }
      }
    }));
  };

  const updateArrayField = (section, language, arrayName, index, field, value) => {
    setContent(prev => {
      const newArray = [...(prev[section]?.[language]?.[arrayName] || [])];
      newArray[index] = {
        ...newArray[index],
        [field]: value
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [language]: {
            ...prev[section]?.[language],
            [arrayName]: newArray
          }
        }
      };
    });
  };

  const addArrayItem = (section, language, arrayName) => {
    setContent(prev => {
      const newArray = [...(prev[section]?.[language]?.[arrayName] || [])];
      newArray.push({});
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [language]: {
            ...prev[section]?.[language],
            [arrayName]: newArray
          }
        }
      };
    });
  };

  const removeArrayItem = (section, language, arrayName, index) => {
    setContent(prev => {
      const newArray = [...(prev[section]?.[language]?.[arrayName] || [])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [language]: {
            ...prev[section]?.[language],
            [arrayName]: newArray
          }
        }
      };
    });
  };

  const handleSave = async (section, language) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/content?admin_password=admin123`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          language,
          data: content[section]?.[language] || {}
        }),
      });

      if (!response.ok) throw new Error('Failed to save');

      toast({
        title: 'Success',
        description: `${section} (${language.toUpperCase()}) saved successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!content) {
    return <div className="text-center py-8 text-gray-400">Loading content...</div>;
  }

  const services = content.services || {
    en: {
      title: 'Services Offered',
      subtitle: 'Traditional & Modern Performances',
      items: []
    },
    ml: {
      title: 'സേവനങ്ങൾ',
      subtitle: 'പരമ്പരാഗത സംഗീതം',
      items: []
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#d4af37] flex items-center gap-2">
        <FileText className="h-6 w-6" />
        Content Management
      </h2>

      <Accordion type="multiple" className="w-full">
        {/* Services Section */}
        <AccordionItem value="services">
          <AccordionTrigger className="text-[#d4af37] text-lg">
            Services Section
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {/* English */}
              <Card className="border-[#d4af37]/30 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]">English (EN)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={services.en.title || ''}
                      onChange={(e) => updateField('services', 'en', 'title', e.target.value)}
                      className="bg-black/50 border-[#d4af37]/30"
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={services.en.subtitle || ''}
                      onChange={(e) => updateField('services', 'en', 'subtitle', e.target.value)}
                      className="bg-black/50 border-[#d4af37]/30"
                    />
                  </div>

                  <div className="border-t border-[#d4af37]/20 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-lg">Service Items</Label>
                      <Button
                        onClick={() => addArrayItem('services', 'en', 'items')}
                        size="sm"
                        className="bg-[#d4af37] text-black"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </div>

                    {(services.en.items || []).map((item, index) => (
                      <Card key={index} className="mb-4 bg-black/30 border-[#d4af37]/20">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Service {index + 1}</Label>
                            <Button
                              onClick={() => removeArrayItem('services', 'en', 'items', index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <Label className="text-sm">Title</Label>
                            <Input
                              value={item.title || ''}
                              onChange={(e) => updateArrayField('services', 'en', 'items', index, 'title', e.target.value)}
                              className="bg-black/50 border-[#d4af37]/30"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Description</Label>
                            <Textarea
                              value={item.description || ''}
                              onChange={(e) => updateArrayField('services', 'en', 'items', index, 'description', e.target.value)}
                              className="bg-black/50 border-[#d4af37]/30"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Tags (comma separated)</Label>
                            <Input
                              value={item.tags || ''}
                              onChange={(e) => updateArrayField('services', 'en', 'items', index, 'tags', e.target.value)}
                              className="bg-black/50 border-[#d4af37]/30"
                              placeholder="tag1, tag2, tag3"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleSave('services', 'en')}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#800020] to-[#9b2335]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save English
                  </Button>
                </CardContent>
              </Card>

              {/* Malayalam */}
              <Card className="border-[#d4af37]/30 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]">Malayalam (ML)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title (Malayalam)</Label>
                    <Input
                      value={services.ml.title || ''}
                      onChange={(e) => updateField('services', 'ml', 'title', e.target.value)}
                      className="bg-black/50 border-[#d4af37]/30 malayalam-text"
                    />
                  </div>
                  <div>
                    <Label>Subtitle (Malayalam)</Label>
                    <Input
                      value={services.ml.subtitle || ''}
                      onChange={(e) => updateField('services', 'ml', 'subtitle', e.target.value)}
                      className="bg-black/50 border-[#d4af37]/30 malayalam-text"
                    />
                  </div>

                  <div className="border-t border-[#d4af37]/20 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-lg">Service Items (Malayalam)</Label>
                      <Button
                        onClick={() => addArrayItem('services', 'ml', 'items')}
                        size="sm"
                        className="bg-[#d4af37] text-black"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </div>

                    {(services.ml.items || []).map((item, index) => (
                      <Card key={index} className="mb-4 bg-black/30 border-[#d4af37]/20">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Service {index + 1}</Label>
                            <Button
                              onClick={() => removeArrayItem('services', 'ml', 'items', index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <Label className="text-sm">Title</Label>
                            <Input
                              value={item.title || ''}
                              onChange={(e) => updateArrayField('services', 'ml', 'items', index, 'title', e.target.value)}
                              className="bg-black/50 border-[#d4af37]/30 malayalam-text"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Description</Label>
                            <Textarea
                              value={item.description || ''}
                              onChange={(e) => updateArrayField('services', 'ml', 'items', index, 'description', e.target.value)}
                              className="bg-black/50 border-[#d4af37]/30 malayalam-text"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Tags (comma separated)</Label>
                            <Input
                              value={item.tags || ''}
                              onChange={(e) => updateArrayField('services', 'ml', 'items', index, 'tags', e.target.value)}
                              className="bg-black/50 border-[#d4af37]/30 malayalam-text"
                              placeholder="tag1, tag2, tag3"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleSave('services', 'ml')}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#800020] to-[#9b2335]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Malayalam
                  </Button>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-sm text-gray-500 mt-4">
        Note: After saving content, refresh the frontend to see changes.
      </p>
    </div>
  );
};

export default ContentEditor;
